import os 
import matplotlib.pyplot as plt
from django.conf import settings

                    
def save_plot(plot_img_path):
     image_path = os.path.join(settings.MEDIA_ROOT, plot_img_path)
     plt.savefig(image_path)
     plt.close()
     return settings.MEDIA_URL + plot_img_path