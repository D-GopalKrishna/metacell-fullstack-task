from django.contrib import admin
from .models import User
from import_export.admin import ImportExportModelAdmin
from import_export import resources

# Register your models here.
## For Import export facility in the admin panel

## Resources
class UserResource(resources.ModelResource):
    class Meta:
        model = User

## Admin
class UserAdmin(ImportExportModelAdmin):
    resource_class = UserResource

## Register the admin onto the admin panel
admin.site.register(User, UserAdmin)
