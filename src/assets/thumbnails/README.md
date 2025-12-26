# Thumbnail Directory Structure

This directory contains all thumbnail images for your portfolio sections.

## Directory Organization

```
thumbnails/
├── projects/          # Project card thumbnails
│   └── image.png     # Example: Blog Writing Platform
├── experience/        # Experience card thumbnails (if needed in future)
└── blogs/            # Blog card thumbnails (if needed in future)
```

## Usage Guidelines

### Projects Thumbnails
- **Location**: `src/assets/thumbnails/projects/`
- **Purpose**: Thumbnail images for project cards in the Projects section
- **Current**: Contains `image.png` for Blog Writing Platform
- **To Add More**: Simply add your project thumbnail images to this directory and import them in `ProjectsSection.tsx`

### Experience Thumbnails
- **Location**: `src/assets/thumbnails/experience/`
- **Purpose**: Reserved for experience card thumbnails if you want to add visual elements to experience cards
- **Currently**: Empty, ready for future use

### Blogs Thumbnails
- **Location**: `src/assets/thumbnails/blogs/`
- **Purpose**: Reserved for blog post thumbnail images
- **Currently**: Empty, ready for future use

## Adding New Thumbnails

### For Projects:
1. Add your image to `src/assets/thumbnails/projects/`
2. Import it in `src/components/portfolio/ProjectsSection.tsx`:
   ```typescript
   import myProjectImage from '../../assets/thumbnails/projects/my-project.png';
   ```
3. Use it in your project object:
   ```typescript
   {
     title: 'My Project',
     image: myProjectImage,
     // ... other fields
   }
   ```

### For Experience or Blogs:
Follow the same pattern as projects, importing from the respective directories.

## Recommended Image Specifications

- **Format**: PNG or JPG
- **Aspect Ratio**: 16:9 or 4:3 works best
- **Size**: Keep under 500KB for optimal performance
- **Dimensions**: Recommended width of 800-1200px
