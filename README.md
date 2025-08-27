# Premium Store - Mobile-First E-commerce Website

A clean, premium, and minimal mobile-first e-commerce website built with HTML5, CSS3, and vanilla JavaScript. Features a dark theme design, shopping cart functionality, cash-on-delivery order processing, and Web3Forms integration for seamless form submissions.

## ✨ Features

- **Multi-Page Website**: Complete website with Home, Products, About, and Contact pages
- **Mobile-First Design**: Responsive layout optimized for mobile devices
- **Dark Theme**: Premium dark mode interface with gradient accents
- **Navigation Menu**: Clean navigation with active state indicators
- **Product Catalog**: Grid-based product display with pricing and discounts
- **Advanced Search & Filtering**: Search products by name/description, filter by category and price
- **View Options**: Toggle between grid and list view for products
- **Shopping Cart**: Sidebar cart with quantity management and total calculation
- **Checkout System**: Complete checkout form with order summary
- **Cash on Delivery**: Payment method support for COD orders
- **Web3Forms Integration**: Seamless form submission for orders and contact forms
- **Local Storage**: Cart persistence across browser sessions
- **Smooth Animations**: CSS transitions and hover effects
- **FAQ Section**: Interactive FAQ with expandable answers
- **Watermark**: Developer attribution watermark
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🚀 Quick Start

1. **Clone or Download** the project files
2. **Open** `index.html` in your web browser
3. **Web3Forms is already configured** with your access key
4. **Customize** products and styling as needed

## 📧 Web3Forms Integration

This website uses Web3Forms for seamless form submissions. Your access key `40efd235-c10b-480f-8383-d78eca671f58` is already configured in all forms.

### Forms Included:
- **Checkout Form**: Sends order details to your email
- **Contact Form**: Sends customer inquiries to your email

### Form Fields Sent:
- Customer name, email, phone, address
- Order items and total amount
- Order ID and payment method
- Contact form subject and message

## 📱 Pages Overview

### 1. **Home Page** (`index.html`)
- Hero section with call-to-action
- Featured products showcase
- About section preview
- Navigation to other pages

### 2. **Products Page** (`products.html`)
- Complete product catalog
- Search functionality
- Category and price filters
- Grid/List view toggle
- Shopping cart integration

### 3. **About Page** (`about.html`)
- Company story and mission
- Core values
- Team information
- Statistics and achievements

### 4. **Contact Page** (`contact.html`)
- Contact information cards
- Contact form with Web3Forms
- Google Maps integration
- FAQ section
- Business hours

## 🛠️ Customization

### Adding Products
Edit the `products` array in `script.js`:

```javascript
const products = [
    {
        id: 1,
        name: "Product Name",
        price: 100.00,
        originalPrice: 120.00,
        image: "product-image-url.jpg",
        description: "Product description",
        category: "electronics" // electronics, stationery, crafts, office
    },
    // Add more products...
];
```

### Changing Colors
Modify CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;      /* Main brand color */
    --secondary-color: #8b5cf6;    /* Secondary brand color */
    --accent-color: #f59e0b;       /* Accent/highlight color */
    --bg-primary: #0f172a;         /* Main background */
    --bg-secondary: #1e293b;       /* Secondary background */
    /* ... more variables */
}
```

### Updating Contact Information
Edit contact details in each HTML file:
- Phone numbers
- Email addresses
- Physical address
- Business hours

### Modifying Watermark
The watermark "Developed by Mubashar Ghazi" appears on all pages. To change it:
1. Update the `.watermark-overlay` span in each HTML file
2. Update the footer watermark in each HTML file

## 📱 Responsive Design

The website is built with a mobile-first approach and includes:

- **Mobile (< 480px)**: Single column layout, optimized spacing
- **Tablet (480px - 768px)**: Adjusted grid and typography
- **Desktop (> 768px)**: Full grid layout with enhanced spacing

## 🎨 Design Features

- **CSS Grid & Flexbox**: Modern layout techniques
- **CSS Variables**: Consistent theming system
- **Gradient Backgrounds**: Premium visual effects
- **Smooth Transitions**: Enhanced user experience
- **Box Shadows**: Depth and visual hierarchy
- **Typography**: Clean, readable font stack
- **Interactive Elements**: Hover effects and animations

## 🔧 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📁 File Structure

```
premium-store/
├── index.html          # Home page
├── products.html       # Products catalog page
├── about.html          # About us page
├── contact.html        # Contact page
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
├── README.md           # This file
└── emailjs-template.md # EmailJS template (for reference)
```

## 🚀 Deployment

### Local Development
- Use a local web server (e.g., Live Server in VS Code)
- Or open `index.html` directly in browser

### Web Hosting
- Upload all files to your web hosting provider
- Web3Forms is already configured and ready to use
- Test the checkout and contact forms

### GitHub Pages
- Push code to GitHub repository
- Enable GitHub Pages in repository settings
- Web3Forms will work automatically

## 🐛 Troubleshooting

### Form Submission Issues
- Verify your Web3Forms access key is correct
- Check browser console for any JavaScript errors
- Ensure all required form fields are filled
- Test with a simple form submission first

### Cart Issues
- Clear browser local storage if cart behaves unexpectedly
- Check JavaScript console for errors
- Verify all required HTML elements exist

### Styling Issues
- Clear browser cache
- Check CSS file is properly linked
- Verify CSS variables are supported in your browser

## 🔒 Security Notes

- Web3Forms handles form submissions securely
- Access key is visible in client-side code (this is normal for Web3Forms)
- Consider server-side validation for production use
- Implement rate limiting if needed

## 📈 Performance Tips

- Optimize product images (compress, use WebP format)
- Minify CSS and JavaScript for production
- Use CDN for external libraries
- Implement lazy loading for product images
- Add service worker for offline functionality

## 🌟 Advanced Features

### Search & Filtering
- Real-time search as you type
- Category-based filtering
- Price range filtering
- Dynamic product count updates

### View Options
- Grid view: Traditional card layout
- List view: Compact horizontal layout
- Responsive design for both views

### FAQ System
- Interactive expandable questions
- Smooth animations
- Mobile-friendly touch interactions

### Mobile Menu
- Hamburger menu for mobile devices
- Smooth slide animations
- Touch-friendly interactions

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve this project.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Web3Forms](https://web3forms.com/) for seamless form integration
- [Font Awesome](https://fontawesome.com/) for icons
- [Unsplash](https://unsplash.com/) for sample product images
- Modern CSS techniques and best practices

---

**Built with ❤️ using HTML5, CSS3, and Vanilla JavaScript**

**Developed by Mubashar Ghazi**
