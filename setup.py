from setuptools import setup, find_packages

setup(
    name='mkdocs-witcherscript-lexer',
    version='0.1.0',
    packages=find_packages(),
    install_requires=[
        'pygments>=2.0'
    ],
    entry_points={
        'pygments.lexers': [
            'witcherscript=plugins.ws_lexer.lexer:WitcherScriptLexer'
        ]
    }
)