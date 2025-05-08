import os
import ycm_core

def Settings(**kwargs):
    return {
        'flags': [
            '-x', 'typescript',
            '-I', os.path.join(os.path.dirname(__file__), 'src'),
            '-I', os.path.join(os.path.dirname(__file__), 'node_modules'),
        ],
        'compilation_database_folder': '',
        'interpreter_path': '/usr/bin/python3',
    }
