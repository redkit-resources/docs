from pygments.lexer import RegexLexer, bygroups, words
from pygments.token import *


class WitcherScriptLexer(RegexLexer):
    name = 'Witcher Script'
    aliases = ['witcherscript', 'ws']
    filenames = ['*.ws']

    # Основные структурные ключевые слова
    _structure_keywords = (
        'class', 'struct', 'enum', 'function', 'event'
    )

    # Модификаторы доступа и поведения
    _modifiers = (
        'private', 'protected', 'public',
        'final', 'abstract', 'virtual_parent',
        'const', 'static', 'transient',
        'inlined', 'latent', 'cleanup', 'editable',
        'saved', 'local', 'timer', 'optional',
        'out',
    )

    # Управляющие конструкции
    _control_keywords = (
        'if', 'else', 'switch', 'case', 'default',
        'for', 'while', 'do', 'break', 'continue',
        'return', 'in'
    )

    # Специальные ключевые слова
    _special_keywords = (
        'extends', 'super', 'parent', 'new', 'delete',
        'savepoint', 'storyscene', 'quest', 'reward',
        'exec', 'entry', 'import', 'statemachine'
    )

    # Типы данных
    _types = (
        'byte', 'int', 'float', 'bool', 'name',
        'string', 'void', 'array', 'var', 'NULL',
        'this'
    )

    # Булевые
    _bool_keywords = (
        'true', 'false'
    )

    # Глобальные объекты
    _global_objects = (
        'theGame', 'theServer', 'thePlayer',
        'theCamera', 'theUI', 'theSound',
        'theDebug', 'theTimer', 'theInput'
    )

    tokens = {
        'root': [
            # Структурные ключевые слова
            (words(_structure_keywords, prefix=r'\b', suffix=r'\b'), Name.Function),

            # Модификаторы
            (words(_modifiers, prefix=r'\b', suffix=r'\b'), Name.Decorator),

            # Управляющие конструкции
            (words(_control_keywords, prefix=r'\b', suffix=r'\b'), Keyword.Control),

            # Специальные ключевые слова
            (words(_special_keywords, prefix=r'\b', suffix=r'\b'), Name.Builtin),

            # Типы данных
            (words(_types, prefix=r'\b', suffix=r'\b'), Keyword.Type),

            # Булевые
            (words(_bool_keywords, prefix=r'\b', suffix=r'\b'), Keyword.Control),

            # Глобальные объекты
            (words(_global_objects, prefix=r'\b', suffix=r'\b'), Name.Decorator),

            # Переменные
            (r'\b[a-zA-Z_][a-zA-Z0-9_]*\s*(?=:)', Name.Variable.Instance),
            (r'\b[a-zA-Z_][a-zA-Z0-9_]*\s*(?==)', Name.Variable.Instance),

            # Типизация через <>
            (r'<\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*>', Name.Class),

            # Вызовы функций
            (r'([a-zA-Z_][a-zA-Z0-9_]*)\s*(\()', bygroups(Name.Function, Punctuation)),

            # Идентификаторы
            (r'\b[a-zA-Z_][a-zA-Z0-9_]*\b', Name),

            # Строки
            (r'L?\'(?:\\.|[^\\\'])*\'', String.Single),
            (r'L?"(?:\\.|[^\\"])*"', String.Double),

            # Числа
            (r'\b\d+\.\d*(?:e[-+]?\d+)?[fl]?\b', Number.Float),
            (r'\b\d+e[-+]?\d+[fl]?\b', Number.Float),
            (r'\b0x[0-9a-fA-F]+u?l{0,2}\b', Number.Hex),
            (r'\b\d+u?l{0,2}\b', Number.Integer),
            (r'\b0\d+u?l{0,2}\b', Number.Oct),

            # Комментарии
            (r'//.*$', Comment.Single),
            (r'/\*', Comment.Multiline, 'comment'),

            # Операторы
            (r'[.=+\-*/%&|^~<>!?]+', Operator),

            # Пунктуация
            (r'[{}();:,\[\]]', Punctuation),

            # Пробелы
            (r'\s+', Text),

        ],
        'comment': [
            (r'[^*/]+', Comment.Multiline),
            (r'/\*', Comment.Multiline, '#push'),
            (r'\*/', Comment.Multiline, '#pop'),
            (r'[*/]', Comment.Multiline),
        ],
    }