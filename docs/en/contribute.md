
# Contributor Guide
Hello! It's great that you've decided to contribute to improving our documentation.
In this guide, we'll explain how to easily and quickly join the development process.

If you've already worked with git and participated in open-source projects, you'll find it easy to get started.
However, we still recommend skimming through this guide, as it contains important details about our development process.

And if you're a beginner, this guide will serve as an excellent starting point for learning such a powerful and useful tool as git.

## Getting Started
The **REDKit** documentation is hosted on **GitHub** and built using Material for MkDocs.

Here are the simple steps to join the development:

1. If you don't have a [GitHub](https://github.com/) account yet, sign up.
2. Go to the [repository](https://github.com/redkit-resources/docs) for the REDKit documentation.
3. Click the "Fork" button in the top-right corner to create your own copy of the repository.

## Text Formatting
We use **markdown** for formatting the documentation – it's a simple and convenient markup language.
You can learn the basics in 5 minutes by reading this quick [guide](https://gist.github.com/cuonggt/9b7d08a597b167299f0d).

Thanks to Material for MkDocs, in addition to standard Markdown, we can use extra features like
tabs, spoilers, notes, and much more. For more details, check the
[official documentation](https://squidfunk.github.io/mkdocs-material/reference/).

!!! tip
    You can use Witcher Script in code blocks. It has syntax highlighting.
    Specify the language as "witcherscript" or "ws".

## How to Make Changes
### Using the GitHub Web Interface
For small edits, it's convenient to use the GitHub web interface:

1. Find the file you want to edit.
2. Click the pencil icon (Edit this file).
3. Make the necessary changes in the Markdown editor.
4. Click the "Commit changes" button.
5. Write a brief description of your changes.
6. Select "Create a new branch for this commit and start a pull request".
7. Click "Propose changes".

### Advanced Method: Working Locally
For significant changes, it's better to work on your computer. Here's what you'll need:

#### Required Tools:
1. [Git](https://git-scm.com/downloads)
2. [Python 3.12](https://www.python.org/downloads/release/python-3128/)
3. [Visual Studio Code](https://code.visualstudio.com/) (recommended editor with useful extensions)
    - Install helpful extensions for working with Markdown:
        1. "Markdown All in One" – makes editing easier.
        2. "Markdown Preview Enhanced" – lets you see how the result will look.

#### Setting Up the Environment
```bash linenums="1"
# Choose a folder for the project
cd path/to/folder

# Clone YOUR fork
git clone https://github.com/your-username/docs.git
cd docs

# Install the required packages
pip install -r requirements.txt

# Create a new branch for your changes
git checkout -b branch-name
```
#### Workflow
1. Open the project in VS Code.
2. Start a local server with the command `mkdocs serve` or `mkdocs serve -f mkdocs.en.yml` for the English version.
3. View changes in real-time at http://127.0.0.1:8000

**After making changes:**

```bash linenums="1"
# Add the modified files to Git
git add .

# Create a commit with a description of the changes
git commit -m "Description of your changes"

# Push the changes to your fork
git push origin branch-name
```

!!! tip "Совет"
    VS Code has a convenient interface for working with Git – you can find it in the Source Control tab ( ++ctrl+shift+g++ )

#### Syncing Your Fork
It's important to regularly sync your fork with the main repository to keep up with changes from other contributors.
    
```bash linenums="1"
# Add the main repository as a remote source (done once)
git remote add upstream https://github.com/redkit-resources/docs.git

# Fetch changes from the main repository
git fetch upstream

# Switch to the main branch
git checkout main

# Apply changes from the main repository
git merge upstream/main

# Push updates to your fork
git push origin main

# Switch to your working branch
git checkout branch-name

# Apply changes from main
git merge main

# Resolve conflicts if they arise
```

#### Creating a Pull Request
1. Open your fork on GitHub.
2. Click "Compare & pull request".
3. Check that:
    - The title clearly explains what you've done.
    - The description includes details about your changes.
    - The main branch is selected.

### Images
!!! warning "Important"
    Let's make the site faster and save space! Use modern image formats!

    WEBP – s the most advanced image storage format today.
    Please use WEBP instead of JPEG or PNG.

    You can compress and convert images using any online converter or use our very simple converter.
    
    Quick usage guide:
    ```bash linenums="1"
    # Go to the project folder if you're not already there
    cd /path/to/folder

    # Convert the image (supports almost all formats)
    python conv.py -i "docs/assets/images/path/to/image.png"
    ```

    The script will automatically replace your file with the converted webp version.

How to add images:

1. Save files in `docs/assets/images/`
2. Reference them using relative paths:

```markdown
![Image description](../assets/images/example.webp)
```

!!! info ""
    To make it easier to find the right images, create separate folders for them inside the images directory.
    Check the existing structure and maintain order.

### Videos
It's better not to upload videos directly to the documentation.

Use YouTube instead:

1. Upload the video to YouTube.
2. Click "Share" → "Embed"
3. Copy the code and paste it into the document.

***

Now you're fully ready to become part of our team! 👏

The translation into English is done using the LLM.