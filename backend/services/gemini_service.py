import google.generativeai as genai
import os
from typing import Dict, List


class GeminiService:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable not set")
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-2.0-flash")

    def generate_title(self, topic: str) -> str:
        """Generate a catchy blog post title based on topic"""
        prompt = f"""Generate a single catchy and engaging blog post title for a blog post about: {topic}
        
        Requirements:
        - Title should be compelling and SEO-friendly
        - Keep it under 60 characters
        - Make it attention-grabbing
        
        Return ONLY the title, nothing else."""

        response = self.model.generate_content(prompt)
        return response.candidates[0].content.parts[0].text.strip()

    def improve_content(self, content: str) -> str:
        """Suggest improvements to blog post content"""
        prompt = f"""Review the following blog post content and suggest improvements for clarity, engagement, and readability:

{content}

Provide specific, actionable suggestions. Format as bullet points with the issue and suggestion."""

        response = self.model.generate_content(prompt)
        return response.candidates[0].content.parts[0].text.strip()

    def generate_summary(self, content: str) -> str:
        """Generate a concise summary of blog post content"""
        prompt = f"""Generate a concise 2-3 sentence summary of the following blog post content:

{content}

Keep it under 150 characters. Return ONLY the summary."""

        response = self.model.generate_content(prompt)
        return response.candidates[0].content.parts[0].text.strip()

    def generate_seo_recommendations(self, title: str, content: str) -> Dict:
        """Generate SEO recommendations for blog post"""
        prompt = f"""Analyze the following blog post and provide SEO recommendations:

Title: {title}

Content: {content[:500]}...

Provide recommendations for:
1. Keywords to target (list 5-7)
2. Meta description (under 160 characters)
3. Suggested headings/structure improvements
4. Internal/external linking opportunities

Format as JSON-like structure."""

        response = self.model.generate_content(prompt)
        return {"recommendations": response.candidates[0].content.parts[0].text.strip()}

    def generate_post_ideas(self, topic: str, count: int = 5) -> List[str]:
        """Generate related blog post ideas based on a topic"""
        prompt = f"""Generate {count} creative and engaging blog post ideas related to: {topic}

Requirements:
- Each idea should be specific and actionable
- Ideas should appeal to both beginners and experts
- Include a brief 1-line description for each

Return as numbered list."""

        response = self.model.generate_content(prompt)
        ideas = response.candidates[0].content.parts[0].text.strip().split("\n")
        return [idea.strip() for idea in ideas if idea.strip()]
