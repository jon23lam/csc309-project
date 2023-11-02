from django.contrib.auth.base_user import BaseUserManager

class UserManager(BaseUserManager):

    def create(self, **kwargs):
        
        user = self.model(**kwargs)
        user.set_password(kwargs['password'])
        user.active = True
        return user

    def create_superuser(self, email, role, password):

        user = self.model(email=email)
        user.set_password(password)
        user.role = role
        user.admin = True
        user.staff = True
        user.active = True
        user.save(using=self._db)
        return user