# EmailJS Template Configuration

This file contains the exact template configuration you need to set up in EmailJS for order notifications.

## 📧 Email Template Setup

### 1. Template Name
```
New Order Notification
```

### 2. Template Subject
```
New Order #{{order_id}} - {{from_name}}
```

### 3. Template Content (HTML)
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Order Notification</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #6366f1; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
        .section { margin-bottom: 20px; }
        .section h3 { color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 5px; }
        .item { display: flex; justify-content: space-between; margin-bottom: 5px; }
        .total { font-weight: bold; font-size: 1.1em; border-top: 2px solid #ddd; padding-top: 10px; }
        .highlight { background: #fff3cd; padding: 10px; border-radius: 5px; border-left: 4px solid #ffc107; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🛍️ New Order Received!</h1>
            <p>Order #{{order_id}}</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h3>📋 Customer Information</h3>
                <p><strong>Name:</strong> {{from_name}}</p>
                <p><strong>Email:</strong> {{from_email}}</p>
                <p><strong>Phone:</strong> {{customer_phone}}</p>
                <p><strong>Address:</strong> {{customer_address}}</p>
            </div>
            
            <div class="section">
                <h3>📅 Order Details</h3>
                <p><strong>Order ID:</strong> {{order_id}}</p>
                <p><strong>Order Date:</strong> {{order_date}}</p>
                <p><strong>Payment Method:</strong> {{payment_method}}</p>
            </div>
            
            <div class="section">
                <h3>🛒 Order Items</h3>
                <div style="white-space: pre-line;">{{items_list}}</div>
            </div>
            
            <div class="section">
                <div class="total">
                    <div class="item">
                        <span>Total Amount:</span>
                        <span>{{total_amount}}</span>
                    </div>
                </div>
            </div>
            
            <div class="highlight">
                <p><strong>⚠️ Action Required:</strong> Please review this order and contact the customer to confirm delivery details.</p>
            </div>
        </div>
    </div>
</body>
</html>
```

### 4. Template Content (Plain Text)
```
🛍️ NEW ORDER RECEIVED!

Order #{{order_id}}

📋 CUSTOMER INFORMATION
Name: {{from_name}}
Email: {{from_email}}
Phone: {{customer_phone}}
Address: {{customer_address}}

📅 ORDER DETAILS
Order ID: {{order_id}}
Order Date: {{order_date}}
Payment Method: {{payment_method}}

🛒 ORDER ITEMS
{{items_list}}

💰 TOTAL AMOUNT: {{total_amount}}

⚠️ ACTION REQUIRED: Please review this order and contact the customer to confirm delivery details.
```

## 🔧 Template Variables

The template uses these variables that are automatically populated:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{order_id}}` | Unique order identifier | ORD-1703123456789-ABC123DEF |
| `{{from_name}}` | Customer's full name | John Doe |
| `{{from_email}}` | Customer's email address | john@example.com |
| `{{customer_phone}}` | Customer's phone number | +92 300 1234567 |
| `{{customer_address}}` | Customer's delivery address | 123 Main St, City, Pakistan |
| `{{payment_method}}` | Payment method selected | Cash on Delivery |
| `{{order_date}}` | Date and time of order | 12/21/2023, 2:30:45 PM |
| `{{total_amount}}` | Total order amount | PKR 1,250.00 |
| `{{items_list}}` | List of ordered items | Mini Calculator × 2 = PKR 300.00<br>Digital Prayer Counter × 1 = PKR 612.00 |

## 📱 Template Features

- **Responsive Design**: Works on both desktop and mobile
- **Professional Styling**: Clean, branded appearance
- **Clear Information**: Easy to read order details
- **Action Items**: Highlights what needs to be done
- **Brand Colors**: Uses your website's color scheme

## 🚀 Testing Your Template

1. **Save the template** in EmailJS dashboard
2. **Test with sample data** using EmailJS testing feature
3. **Verify email delivery** to your admin email
4. **Check formatting** on different email clients

## 🔒 Security Notes

- The template variables are populated from customer input
- Consider sanitizing HTML content if allowing rich text
- EmailJS handles the email delivery securely
- Template is stored securely in EmailJS dashboard

## 📞 Support

If you need help with EmailJS setup:
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Support](https://www.emailjs.com/support/)
- [Template Examples](https://www.emailjs.com/examples/)
