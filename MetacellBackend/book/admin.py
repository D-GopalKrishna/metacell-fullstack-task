from django.contrib import admin
from .models import *

# ## Resources
# class PaymentsResource(resources.ModelResource):
#     class Meta:
#         model = Payments

# ## Admin
# class PaymentsAdmin(ImportExportModelAdmin):
#     resource_class = PaymentsResource

## Register the admin onto the admin panel
admin.site.register(Book)
admin.site.register(Author)
admin.site.register(Rating)
admin.site.register(Note)