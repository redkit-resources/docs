from PIL import Image
import os
import argparse

SUPPORTED_FORMATS = {
    '.jpg', '.jpeg', '.png', '.bmp',
    '.tiff', 'webp', '.ppm', '.ico'
}


def check_image(file_path):
    try:
        with Image.open(file_path) as img:
            img.verify()
        with Image.open(file_path) as img:
            img.load()
        return True, ""
    except (IOError, SyntaxError) as e:
        return False, str(e)
    except Exception as e:
        return False, str(e)


def is_supported_format(file_path):
    extension = os.path.splitext(file_path)[1].lower()
    return extension in SUPPORTED_FORMATS


def convert_to_webp(source_path):
    if not os.path.exists(source_path):
        print(f"Ошибка: Файл {source_path} не существует")
        return False

    if not is_supported_format(source_path):
        print(f"Ошибка: Формат файла {source_path} не поддерживается")
        return False

    is_valid, error_message = check_image(source_path)
    if not is_valid:
        print(f"Ошибка: Файл {source_path} поврежден или недействителен")
        print(f"Детали: {error_message}")
        return False

    try:
        image = Image.open(source_path)
        filename = os.path.splitext(source_path)[0]

        image.save(f"{filename}.webp", 'webp', quality=80)
        image.close()

        os.remove(source_path)

        print(f"Успешно конвертирован файл {source_path} в формат WebP")
        return True

    except Exception as e:
        print(f"Ошибка при конвертации {source_path}: {str(e)}")
        return False


def convert_directory(directory_path, recursive=False):
    if not os.path.isdir(directory_path):
        print(f"Ошибка: {directory_path} не является папкой")
        return

    success_count = 0
    error_count = 0

    for root, dirs, files in os.walk(directory_path):
        if root != directory_path and not recursive:
            continue

        for file in files:
            file_path = os.path.join(root, file)
            if is_supported_format(file_path):
                if convert_to_webp(file_path):
                    success_count += 1
                else:
                    error_count += 1

    print("\nКонвертация завершена!")
    print(f"Успешно конвертировано: {success_count} файлов")
    print(f"Не удалось конвертировать: {error_count} файлов")


def get_user_confirmation(directory_path, recursive=False):
    mode = "Рекурсивный" if recursive else "Только в этой папке"
    print(f"\nВы ТОЧНО хотите конвертировать ВСЕ изображения в {directory_path}?")
    print(f"Режим: {mode}")
    print("Это действие удалит ВСЕ оригинальные изображения в "
          "указанной папке или во всех его подпапках (Рекурсивный режим)!")

    print("\nФорматы файлов которые будут конвертированы:", ", ".join(SUPPORTED_FORMATS))

    while True:
        response = input("\nВы хотите продолжить? (да/нет): ").lower()
        if response in ['да', 'д']:
            return True
        if response in ['нет', 'н']:
            return False
        print("Пожалуйста, введите 'да' или 'нет'")


def main():
    parser = argparse.ArgumentParser(description='Конвертировать изображения в WebP')
    parser.add_argument('-i', '--input', required=True,
                        help='Путь к изображению или папке с изображениями')
    parser.add_argument('-r', '--recursive', action='store_true',
                        help='Рекурсивный режим')

    args = parser.parse_args()

    if os.path.isdir(args.input):
        if get_user_confirmation(args.input, args.recursive):
            convert_directory(args.input, args.recursive)
        else:
            print("Операция отменена пользователем")
    else:
        convert_to_webp(args.input)


if __name__ == "__main__":
    main()
