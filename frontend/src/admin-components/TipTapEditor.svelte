<script lang="ts">
    import type { StoryLine } from "$lib/types";
    import { onMount, onDestroy } from 'svelte';
    import Icon from '@iconify/svelte';
    import { Stepper, Step, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton';
    import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
    import { FileButton } from "@skeletonlabs/skeleton";
    import { modalStore } from '@skeletonlabs/skeleton';
    import { Editor } from '@tiptap/core';
    import StarterKit from '@tiptap/starter-kit';
    import Document from '@tiptap/extension-document'
    import Paragraph from '@tiptap/extension-paragraph'
    import Text from '@tiptap/extension-text'
    import TextAlign from "@tiptap/extension-text-align"
    import CharacterCount from "@tiptap/extension-character-count"
    import Heading from '@tiptap/extension-heading'
    import Italic from '@tiptap/extension-italic'
    import TextStyle from '@tiptap/extension-text-style'
    import FontFamily from '@tiptap/extension-font-family'
    import Code from '@tiptap/extension-code'
    import Typography from '@tiptap/extension-typography'
    import Placeholder from '@tiptap/extension-placeholder'
    import HardBreak from '@tiptap/extension-hard-break'
  
    let element : HTMLDivElement;
    var editor : any;
    let chars: number;
    let words: number;
    const limit: number = 60

    var storyline: StoryLine;

    export let title: string = "";
    export let content: string = ``;
    export let uuid: string = "";
    export let editing: boolean = false;

    let files : FileList;
    let img_uploaded : boolean = false;

    var no_storyline: boolean = false;
    var available_storylines: Array<StoryLine>;
    var set_storyline: string;  // Contains newly set Storyline when there's not a Storyline existing already

    let CustomDocument = Document.extend({
        content: "heading block*",
    })
  
    onMount(async () => {
        // Collect additional parts for storyline
        if (editing && uuid !== "") {
            const response = await fetch("/admin/actions/get-storyline-" + uuid, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            if (response.ok) {
                const data = await response.json();

                if (data.status === 404 || data.status === 500) {
                    no_storyline = true
                } else {
                    storyline = data.storyline;
                }
            }
        }

        if (no_storyline) {
            console.log("No Storyline")
            const response = await fetch("/admin/actions/get-available-storylines", {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })

            if (response.ok) {
                const data = await response.json();
                available_storylines = data.storylines;
            }
        }

        editor = new Editor({
            element: element,
            extensions: [
                CustomDocument,
                Paragraph,
                Code,
                Italic,
                Typography,
                HardBreak.configure({
                    HTMLAttributes: {
                        class: "linebreak"
                    }
                }),
                Text.configure({
                    
                }),
                StarterKit.configure({
                    heading: {
                        levels: [1, 2, 3],
                    },
                    document: false
                }),
                Placeholder.configure({
                    placeholder: ({ node }) => {
                        if (node.type.name === 'heading') {
                            return 'Story Titel'
                        }
                            
                        return 'Schreib einfach drauf los ;)'
                    },
                    emptyNodeClass: 'first:before:h-0 first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none'

                }),
                CharacterCount,
                Heading.configure({
                    levels: [1, 2, 3],
                }),
                TextAlign.configure({
                    defaultAlignment: 'left',
                    alignments: ['left', 'right', 'center', 'justify'],
                    types: ['heading', 'paragraph'],
                }),
                TextStyle.configure({
                    
                }),
                FontFamily.configure({
                    types: ['textStyle'],
                })
            ],
            content: `
                <h1>${title}</h1>
                <p>
                    ${content}
                </p>
            `,
            editorProps: {
                attributes: {
                    spellcheck: "true"
                }
            },
            autofocus: true,
            editable: true,
            injectCSS: false,
            onTransaction: () => {
                // force re-render so `editor.isActive` works as expected
                editor = editor
            },
            onUpdate: () => {
                let current = editor.view.state.selection.$head.parent;
                let linecount = editor.storage.characterCount.characters({ node: current })
                if (linecount === limit) {
                    editor.commands.setHardBreak()
                }

                chars = editor.storage.characterCount.characters();
                words = editor.storage.characterCount.words();
            }
        })

        chars = editor.storage.characterCount.characters();
        words = editor.storage.characterCount.words();
        editor.commands.setFontFamily("serif")
    })
  
    onDestroy(() => {
      if (editor) {
        editor.destroy()
      }
    })

    function pre_save() { // Checks if story has no image and if story isn't being edited but new 
        if (img_uploaded === false && uuid === "") {
            const confirm: ModalSettings = {
                type: 'confirm',
                title: 'Sicher?',
                body: `
                    <span>Sicher, dass du kein Bild hochladen willst?</span>
                `,
                response: (r: boolean) => {
                    if (r) {
                        save()
                    }
                },
                buttonTextCancel: 'Zurück',
                buttonTextConfirm: 'Weiter'
            };
            modalStore.trigger(confirm);
        } else {
            save()
        }
    }

    async function save() {
        const all: any = editor.getJSON();
        console.log(all)
        all.content.forEach(elem => {   // Get story title
            if (elem.content !== undefined) {
                if (elem.type === "heading" && elem.attrs.level === 1) {
                    title = elem.content[0].text;
                }/*else {
                    if (elem.content[0].text === " ") {
                        content = content + "\n";
                    } else {
                        content = content + " " + elem.content[0].text;
                    }
                }*/
            }
        });

        content = editor.state.doc.textContent.replace(title, "") // gets entire text and removes first occurence of title (original title)
        console.log(content)
        
        if (editing === false) {            
            const response = await fetch("/admin/actions/add", { // If not editing, add new
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json"
                }),
                body: JSON.stringify({
                    title: title,
                    content: content
                })
            })

            if (response.ok) {
                const data = await response.json();
                uuid = data.story.uuid;

                const t: ToastSettings = {
                    message: 'Save successful',
                    // Optional: The auto-hide settings
                    autohide: true,
                    timeout: 3000,
                    classes: 'bg-gradient-to-tr from-green-400 to-green-900 text-white',
                };
                toastStore.trigger(t);

                if (no_storyline && set_storyline !== undefined) { // Check if there's a better way to check all that
                    const response = await fetch("/admin/actions/add-to-storyline", { // Add to storyline if not already
                        method: "POST",
                        headers: new Headers({
                            "Content-Type": "application/json"
                        }),
                        body: JSON.stringify({
                            story: story.uuid,
                            storyline: set_storyline
                        })
                    });

                    if (response.ok) {
                        console.log("Added successfully")
                    }
                }
            }
        } else {
            const response = await fetch("/admin/actions/edit", {    // if editing
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }),
                body: JSON.stringify({
                    uuid: uuid,
                    title: title,
                    content: content
                })
            })

            if (response.ok) {
                
            }
        }
        
    }

    async function img_upload() {
        img_uploaded = true

        const formData = new FormData();
        if (files !== undefined) {
            const image: File | null = files.item(0);
            if (image !== null && uuid !== "" && uuid !== undefined) {
                formData.append("image", image)
                formData.append("uuid", uuid)
                const response = await fetch("/admin/actions/upload-image", {
                    method: "POST",
                    headers: new Headers({
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Accept": "application/json"
                    }),
                    body: formData
                })

                if (response.ok) {
                    
                }
            }
        }
    }
</script>
  
<div class="grid grid-cols-3">
    <div class="col-span-2">
        {#if editor}
        <div class="p-5 bg-stone-800 rounded-t-lg border-stone-900 border-4 flex">
            <div class="mr-auto my-auto">
                <button
                    on:click={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
                    class:active={editor.isActive('heading', { level: 1 })}>
                    H1
                </button>
                <button
                    on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    class:active={editor.isActive('heading', { level: 2 })}>
                    H2
                </button>
                <button on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    class:active={editor.isActive('heading', { level: 3 })}>
                    H3
                </button>
                <button on:click={() => editor.chain().focus().setParagraph().run()} 
                    class:active={editor.isActive('paragraph')}>
                    P
                </button>
                <button on:click={() => editor.chain().focus().toggleBold().run()}
                    class:active={editor.isActive('bold')}>
                    <b>Bold</b>
                </button>
                <button on:click={() => editor.chain().focus().toggleItalic().run()}
                    class:active={editor.isActive('italic')}>
                    <i>Italic</i>
                </button>
                <button on:click={() => editor.chain().focus().setFontFamily('Comic Sans MS, Comic Sans').run()}
                    class:active={editor.isActive('textStyle', { fontFamily: 'Comic Sans MS, Comic Sans' })}>
                    <span class="font-sans">Comic Sans</span>
                </button>
                <button on:click={() => editor.chain().focus().setFontFamily('serif').run()} 
                    class:active={editor.isActive('textStyle', { fontFamily: 'serif' })}>
                    <span class="font-serif">Serif</span>
                </button>
                <button on:click={() => editor.chain().focus().setFontFamily('monospace').run()}
                    class:active={editor.isActive('textStyle', { fontFamily: 'monospace' })}>
                    <span class="font-mono">Monospace</span>
                </button>
                <button on:click={() => editor.chain().focus().unsetFontFamily().run()}
                    class:active={editor.isActive('textStyle', { fontFamily: 'monospace' })}>
                    Default Font
                </button>
            </div>

            <div class="mx-3 my-auto">
                <button on:click={editor.chain().focus().setTextAlign('left').run()} 
                    class:active={editor.isActive({ textAlign: 'left' })}>
                    <Icon icon="material-symbols:format-align-left" class="text-2xl"></Icon>
                </button>
                <button on:click={editor.chain().focus().setTextAlign('center').run()}
                    class:active={editor.isActive({ textAlign: 'center' })}>
                    <Icon icon="material-symbols:format-align-center" class="text-2xl"></Icon>
                </button>
                <button on:click={editor.chain().focus().setTextAlign('right').run()}
                    class:active={editor.isActive({ textAlign: 'right' })}>
                    <Icon icon="material-symbols:format-align-right" class="text-2xl"></Icon>
                </button>
                <button on:click={editor.chain().focus().setTextAlign('justify').run()}
                    class:active={editor.isActive({ textAlign: 'justify' })}>
                    <Icon icon="material-symbols:format-align-justify" class="text-2xl"></Icon>
                </button>
            </div>

            <div class="ml-auto my-auto">
                <button on:click={pre_save} class="active:bg-black bg-gray-800">
                    <Icon icon="material-symbols:save-outline-rounded" class="text-2xl"></Icon>
                </button>
            </div>
        </div>
        {/if}
        <div bind:this={element} />
    </div>
    <div class="col-span-1 px-5">
        <ul class="list-nav w-fit bg-primary-800">
            <a href="#">Zeichen: {chars}</a>
            <a href="#">Wörter: {words}</a>
        </ul>
        {#if storyline !== undefined && uuid !== ""}
            <span>{storyline.title}</span>
            <Stepper>
                {#each storyline.stories as story}
                    {#if story.uuid === uuid}
                        <Step><span class="text-5xl">{story.title}</span></Step>
                    {:else}
                        <Step>{story.title}</Step>
                    {/if}
                {/each}
            </Stepper>
        {/if}
        <FileButton multiple={false} button="variant-filled-primary rounded-full m-5" name="files" bind:files on:change={img_upload}>Image Upload</FileButton>
        {#if files !== undefined}
            <span>{files.item(0).name}</span>
        {/if}
        {#if no_storyline}
            <div class="container space-y-5">
                <h2>Add current story to storyline</h2>
                {#if available_storylines !== undefined}
                    {#each available_storylines as storyline}
                        <button on:click={() => set_storyline = storyline.uuid} class="btn variant-ghost-primary w-full focus:variant-filled-primary duration-150">{storyline.title}</button>
                    {/each}
                {/if}
            </div>
        {/if}
    </div>
</div>

<style lang="postcss">
    button {
        @apply btn p-2 border-2 border-stone-900 bg-stone-800;
    }

	button.active {
        background: black;
        color: white;
    }
</style>