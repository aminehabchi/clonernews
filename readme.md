# Hacker News Client

## Overview

This is a lightweight, dynamic web application that provides a seamless browsing experience for Hacker News content. Built with vanilla JavaScript, the app allows users to explore various types of content from Hacker News, including stories, jobs, and polls.

## Features

### Content Types
- **New Stories**: Browse the latest stories from Hacker News
- **Job Stories**: Explore current job listings
- **Polls**: View and interact with community polls

### Key Functionality
- **Pagination**: Navigate through stories with Next/Previous buttons
- **Real-time Updates**: Automatic tracking of new items
- **Detailed Item View**:
  - Title
  - Author
  - Timestamp
  - Score
  - Direct links to original content
  - Comment viewing

## Technologies Used
- HTML5
- CSS3
- Vanilla JavaScript
- Hacker News Firebase API

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hacker-news-client.git
   ```

2. Open `index.html` in your web browser

## Usage

### Navigation Buttons
- **New Stories**: View the latest Hacker News submissions
- **Job Stories**: Browse job-related posts
- **Polls**: Explore community polls
- **Next/Previous**: Paginate through content

### Update Indicator
The "Update" label turns red and increments when new items are detected in the Hacker News feed.

## API Reference
- Uses Hacker News Firebase API (https://hacker-news.firebaseio.com/v0/)
- Endpoints:
  - `/newstories.json`: Latest stories
  - `/jobstories.json`: Job listings
  - `/item/{id}.json`: Individual item details

## Performance Optimizations
- Debounced event handlers
- Async/await for efficient data fetching
- Error handling for API requests