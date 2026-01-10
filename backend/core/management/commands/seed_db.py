
from django.core.management.base import BaseCommand
from services.models import Service
from portfolio.models import Project, ProjectImage
from testimonials.models import Testimonial
from blog.models import BlogPost
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import SimpleUploadedFile
import io
from PIL import Image, ImageDraw, ImageFont
import random
from datetime import date, timedelta

class Command(BaseCommand):
    help = 'Seeds the database with initial test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding data...')
        
        # Clear existing data
        Service.objects.all().delete()
        Project.objects.all().delete()
        Testimonial.objects.all().delete()
        BlogPost.objects.all().delete()

        def create_placeholder_image(color, text, size=(800, 600)):
            image = Image.new('RGB', size, color)
            draw = ImageDraw.Draw(image)
            # Try to center text roughly
            w, h = size
            draw.text((w/2 - 50, h/2), text, fill="white")
            
            img_io = io.BytesIO()
            image.save(img_io, format='JPEG')
            return ContentFile(img_io.getvalue(), name=f"{text.lower().replace(' ', '_')}.jpg")

        # 1. Services
        services_data = [
            {"title": "Gypsum Install", "desc": "Custom ceiling designs and partitions.", "icon": "Layers", "color": "#1a237e"},
            {"title": "Interior Painting", "desc": "Professional wall finishing and textures.", "icon": "Palette", "color": "#0d47a1"},
            {"title": "Modular Kitchens", "desc": "Space-saving and modern kitchen units.", "icon": "Layout", "color": "#006064"},
            {"title": "SPC Flooring", "desc": "Waterproof and durable luxury flooring.", "icon": "Layers", "color": "#004d40"},
            {"title": "Wall Murals", "desc": "Artistic wall coverings and wallpapers.", "icon": "Palette", "color": "#1b5e20"},
            {"title": "Office Partitioning", "desc": "Glass and aluminum office dividers.", "icon": "Layout", "color": "#33691e"},
        ]

        for s in services_data:
            img = create_placeholder_image(s['color'], s['title'])
            Service.objects.create(
                title=s['title'],
                description=s['desc'] * 5, # Make it a bit longer
                icon=s['icon'],
                image=img,
                featured=True
            )
        self.stdout.write(self.style.SUCCESS('Services created.'))

        # 2. Portfolio Projects
        projects_data = [
            {"title": "Modern Apartment Renovation", "cat": "RESIDENTIAL", "desc": "Full remodal of a 3-bedroom apartment.", "loc": "Nairobi, Westlands"},
            {"title": "Tech Startup Office", "cat": "COMMERCIAL", "desc": "Open plan office with glass partitions.", "loc": "Kilimani, Nairobi"},
            {"title": "Luxury Villa Flooring", "cat": "RESIDENTIAL", "desc": "Installation of premium SPC flooring throughout.", "loc": "Karen, Nairobi"},
            {"title": "Garden Landscaping", "cat": "LANDSCAPING", "desc": "Exterior design with pergolas and seating.", "loc": "Runda estate"},
            {"title": "Kitchen Makeover", "cat": "RENOVATION", "desc": "Conversion of old kitchen to modern modular style.", "loc": "Lavington, Nairobi"},
        ]

        for i, p in enumerate(projects_data):
            img = create_placeholder_image(random.choice(['#263238', '#37474f', '#455a64']), p['title'])
            proj = Project.objects.create(
                title=p['title'],
                category=p['cat'],
                description=p['desc'] * 3,
                location=p['loc'],
                cover_image=img,
                completion_date=date.today() - timedelta(days=i*30)
            )
            # Add gallery images
            for j in range(3):
                g_img = create_placeholder_image(random.choice(['#546e7a', '#78909c']), f"{p['title']} View {j+1}")
                ProjectImage.objects.create(project=proj, image=g_img, caption=f"View {j+1}")
        
        self.stdout.write(self.style.SUCCESS('Projects created.'))

        # 3. Testimonials
        testimonials_data = [
            {"name": "Alice Johnson", "review": "Urbaneville transformed my living room completely!", "rating": 5},
            {"name": "Mark Spencer", "review": "Professional team and finished on time. Highly recommend.", "rating": 5},
            {"name": "Sarah Davis", "review": "The gypsum work is just perfect. Very clean finish.", "rating": 4},
        ]
        
        for t in testimonials_data:
            Testimonial.objects.create(
                client_name=t['name'],
                review=t['review'],
                rating=t['rating']
            )
        self.stdout.write(self.style.SUCCESS('Testimonials created.'))

        # 4. Blog Posts
        blog_data = [
            {"title": "Top Trends in 2026 Interiors", "tags": "Trends, Design", "content": "Minimalism is evolving... " + "Lorem ipsum " * 50},
            {"title": "Why Choose SPC Flooring?", "tags": "Flooring, Guides", "content": "SPC flooring offers water resistance... " + "Lorem ipsum " * 50},
            {"title": "Color Palettes for Small Spaces", "tags": "Colors, Tips", "content": "Light colors make a room feel bigger... " + "Lorem ipsum " * 50},
        ]

        for b in blog_data:
            img = create_placeholder_image('#3e2723', b['title'])
            BlogPost.objects.create(
                title=b['title'],
                content=b['content'],
                cover_image=img,
                tags=b['tags'],
                published=True
            )
        self.stdout.write(self.style.SUCCESS('Blog posts created.'))
        
        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))
