from rest_framework_simplejwt.backends import TokenBackend
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

def get_user(request):
    token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]

    if token != None and token != "":
        #data = TokenBackend(algorithm='HS256').decode(token, verify=True)
        data = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        print(data)
        user_id = data['user_id']
        user = get_user_model().objects.filter(pk=user_id)

        return user.first()

    return None