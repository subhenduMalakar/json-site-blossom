
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import json
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'directory_explorer_secret_key'

# Load directory data from a JSON file
def load_directory_data():
    try:
        with open('directory_data.json', 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {"items": []}

# Save directory data to a JSON file
def save_directory_data(data):
    with open('directory_data.json', 'w') as file:
        json.dump(data, file, indent=4)

# Initialize data if it doesn't exist
try:
    with open('directory_data.json', 'r') as file:
        pass
except FileNotFoundError:
    # Create sample data
    sample_data = {
        "items": [
            {
                "id": "1",
                "name": "Tech Innovations Inc",
                "description": "A leading technology company specializing in AI and machine learning solutions.",
                "category": "Technology",
                "address": "123 Tech Avenue, Silicon Valley, CA",
                "contact": {
                    "phone": "555-123-4567",
                    "email": "info@techinnovations.example"
                },
                "website": "https://techinnovations.example",
                "rating": 4.8,
                "imageUrl": "/static/placeholder.svg",
                "socialMedia": {
                    "facebook": "facebook.com/techinnovations",
                    "twitter": "twitter.com/techinnovations",
                    "instagram": "instagram.com/techinnovations"
                }
            },
            {
                "id": "2",
                "name": "Green Earth Landscaping",
                "description": "Sustainable landscaping services for residential and commercial properties.",
                "category": "Home & Garden",
                "address": "456 Garden Road, Greenville, OR",
                "contact": {
                    "phone": "555-987-6543",
                    "email": "contact@greenearth.example"
                },
                "website": "https://greenearth.example",
                "rating": 4.5,
                "imageUrl": "/static/placeholder.svg",
                "socialMedia": {
                    "facebook": "facebook.com/greenearth",
                    "instagram": "instagram.com/greenearth"
                }
            },
            {
                "id": "3",
                "name": "Culinary Delights Restaurant",
                "description": "Fine dining restaurant offering international cuisine with local ingredients.",
                "category": "Food & Dining",
                "address": "789 Gourmet Blvd, Foodville, NY",
                "contact": {
                    "phone": "555-789-0123",
                    "email": "reservations@culinarydelights.example"
                },
                "website": "https://culinarydelights.example",
                "rating": 4.9,
                "imageUrl": "/static/placeholder.svg",
                "socialMedia": {
                    "facebook": "facebook.com/culinarydelights",
                    "twitter": "twitter.com/culinarydelights",
                    "instagram": "instagram.com/culinarydelights"
                }
            }
        ]
    }
    save_directory_data(sample_data)

# Routes
@app.route('/')
def index():
    page = request.args.get('page', 1, type=int)
    items_per_page = 6
    directory_data = load_directory_data()
    items = directory_data['items']
    
    # Simple pagination
    start_idx = (page - 1) * items_per_page
    end_idx = start_idx + items_per_page
    paginated_items = items[start_idx:end_idx]
    
    total_pages = (len(items) + items_per_page - 1) // items_per_page
    
    return render_template('index.html', 
                          items=paginated_items, 
                          page=page, 
                          total_pages=total_pages,
                          items_per_page=items_per_page,
                          total_items=len(items))

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/directory/<string:id>')
def directory_details(id):
    directory_data = load_directory_data()
    item = next((item for item in directory_data['items'] if item['id'] == id), None)
    
    if not item:
        flash('Directory item not found!', 'error')
        return redirect(url_for('index'))
        
    return render_template('directory_details.html', item=item)

@app.route('/favorites')
def favorites():
    return render_template('favorites.html')
    
@app.route('/api/favorites', methods=['GET'])
def get_favorites():
    try:
        with open('favorites.json', 'r') as file:
            return jsonify(json.load(file))
    except FileNotFoundError:
        return jsonify({"favorites": []})

@app.route('/api/favorites', methods=['POST'])
def update_favorites():
    data = request.json
    with open('favorites.json', 'w') as file:
        json.dump(data, file)
    return jsonify({"status": "success"})

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/contact', methods=['POST'])
def submit_contact():
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')
    
    # Here you would typically send an email or save to a database
    # For now, we'll just simulate success
    
    flash('Thank you for your message! We will get back to you soon.', 'success')
    return redirect(url_for('contact'))

@app.route('/privacy-policy')
def privacy_policy():
    return render_template('privacy_policy.html')

@app.route('/blog')
def blog_list():
    try:
        with open('blog_data.json', 'r') as file:
            blog_data = json.load(file)
    except FileNotFoundError:
        blog_data = {"posts": []}
        
    return render_template('blog_list.html', posts=blog_data['posts'])

@app.route('/blog/<string:slug>')
def blog_detail(slug):
    try:
        with open('blog_data.json', 'r') as file:
            blog_data = json.load(file)
            
        post = next((post for post in blog_data['posts'] if post['slug'] == slug), None)
        
        if not post:
            flash('Blog post not found!', 'error')
            return redirect(url_for('blog_list'))
            
        return render_template('blog_detail.html', post=post)
    except FileNotFoundError:
        flash('Blog data not found!', 'error')
        return redirect(url_for('blog_list'))

if __name__ == '__main__':
    app.run(debug=True)
