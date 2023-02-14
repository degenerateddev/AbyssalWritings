type StoryPreview = {
    uuid: string;
    title: string;
    content: string;
    image: string;
    date: string;

    hearts: number;
};

type User = {
    loggedIn: boolean;
    username: string;
    avatar: string;
}

type Tokens = {
    refresh: string;
    access: string;
}

type StoryComment = {
    user: User;

    text: string;
    date: string;
}

type Story = {
    uuid: string;
    title: string;
    content: string;
    date: string;
    
    image: string;
    comments: Array<StoryComment>;
    genre: Genre;

    active: boolean;

    hearts: number;
}

type Genre = {
    name: string;
    description: string;
    banner: string;
}

type StoryLine = {
    title: string;
    description: string;
    
    stories: Array<Story>
}