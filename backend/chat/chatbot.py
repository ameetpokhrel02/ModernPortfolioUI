import re
import random
from django.utils import timezone


def get_bot_response(user_message):
    """
    Simple rule-based chatbot for Amit's portfolio
    """
    message = user_message.lower().strip()
    
    # Greetings
    if any(word in message for word in ['hi', 'hello', 'hey', 'greetings']):
        responses = [
            "Hello! I'm here to help you learn about Amit's work and skills.",
            "Hi there! What would you like to know about Amit?",
            "Hey! I can tell you about Amit's projects, skills, or experience."
        ]
        return random.choice(responses)
    
    # Skills related
    elif any(word in message for word in ['skill', 'technology', 'tech', 'programming', 'language']):
        return """Amit is skilled in:
        
🚀 **Frontend**: React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS
💻 **Backend**: Python, Django, Node.js, REST APIs
🗄️ **Database**: PostgreSQL, MySQL, SQLite, MongoDB  
☁️ **Cloud**: AWS, Docker, CI/CD
🔧 **Tools**: Git, Linux, IoT Development

What specific technology would you like to know more about?"""
    
    # Projects related
    elif any(word in message for word in ['project', 'work', 'portfolio', 'built', 'created']):
        return """Here are some of Amit's notable projects:

🛍️ **E-commerce Platform**: Full-stack web application with React & Django
🏠 **IoT Home Automation**: Smart home system with sensor integration
📱 **Portfolio Website**: This very site you're on! Built with React & Django
🔧 **Various Web Apps**: Multiple client projects using modern tech stack

Would you like details about any specific project?"""
    
    # Experience related
    elif any(word in message for word in ['experience', 'work', 'job', 'career', 'company']):
        return """Amit's professional experience includes:

💼 **Max International** - Junior Cloud Engineer (2025 - current)
   Managing cloud infrastructure and web application deployment

🚀 **Innovate Nepal Group** - Frontend Intern (2025 - current)  
   React development and IoT project collaboration

💻 **Freelance** - Frontend Developer (2023 - Present)
   Building responsive UIs and IoT integrations

Want to know more about any specific role?"""
    
    # Contact related
    elif any(word in message for word in ['contact', 'reach', 'email', 'hire', 'work together']):
        return """You can reach Amit through:

📧 **Contact Form**: Use the contact form on this website
💼 **LinkedIn**: Connect for professional opportunities  
📱 **Direct Message**: Available for project discussions
🤝 **Collaboration**: Open to freelance and full-time opportunities

Feel free to use the contact form below to get in touch!"""
    
    # Location related
    elif any(word in message for word in ['location', 'where', 'based', 'live']):
        return "Amit is based in Kathmandu, Nepal 🇳🇵 and available for both local and remote opportunities!"
    
    # Education related
    elif any(word in message for word in ['education', 'study', 'degree', 'university', 'college', 'bachelor', 'plus two']):
        return """Amit's educational background:

🎓 **Bachelor's Degree** - Computer Science & Engineering
   London Metropolitan University (UK Affiliated)
   Itahari International College, Nepal (2021-2025)
   
📚 **Plus Two (+2)** - Science
   Kathmandu Model College (KMC), Kathmandu (2019-2021)

🌟 **Key Areas**: Software Engineering, Data Structures, Web Technologies, Database Management, and Project Management

Always expanding knowledge through hands-on projects and continuous learning!"""
    
    # IoT related
    elif any(word in message for word in ['iot', 'internet of things', 'sensors', 'hardware', 'arduino', 'raspberry']):
        return """Amit has extensive IoT experience:

🔧 **Hardware**: Arduino, Raspberry Pi, ESP32/ESP8266
📡 **Sensors**: Temperature, humidity, motion, light sensors
🌐 **Connectivity**: WiFi, Bluetooth, MQTT protocols
☁️ **Cloud Integration**: AWS IoT, real-time data processing
🏠 **Applications**: Home automation, monitoring systems

Interested in IoT project collaboration?"""
    
    # Thanks
    elif any(word in message for word in ['thank', 'thanks', 'appreciate']):
        responses = [
            "You're welcome! Feel free to ask anything else about Amit.",
            "Happy to help! Is there anything else you'd like to know?",
            "Glad I could help! Any other questions about Amit's work?"
        ]
        return random.choice(responses)
    
    # Default responses
    else:
        responses = [
            "I can help you learn about Amit's skills, projects, experience, or how to contact him. What interests you most?",
            "Feel free to ask about Amit's technical skills, work experience, projects, or background!",
            "I'm here to share information about Amit's professional work. What would you like to know?",
            "You can ask me about Amit's programming skills, IoT projects, work experience, or how to get in touch!"
        ]
        return random.choice(responses)