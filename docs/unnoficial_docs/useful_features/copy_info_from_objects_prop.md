---
tags:
  - Полезное
  - Редактор
---

# Как скопировать информацию из свойств объекта

В REDkit каждый объект имеет набор свойств. Часто необходимо скопировать их названия, 
для использования в своих целей (например поиска в сети).

Существует удобный способ быстро скопировать всю структуру свойств из группы свойств.

![img.webp](../../assets/images/unnoficial_docs/usesful_features/info_prop.webp)

## Способ 1: Копирование всей группы свойств

1. Щелкните правой кнопкой мыши по группе свойств (на скрине это серый блок с надписью CRecource или CWorld) 
2. Выберите пункт «Copy» в контекстном меню.

В результате в буфер обмена будет скопирован следующий XML

```xml
<?xml version="1.0" encoding="UTF-16"?>
<CopyToClipboard type="CGameWorld">
    <group name="CResource">
        <property name="importFile" value="" />
        <property name="importFileTimeStamp" value="01/01/00 00:00:00" />
    </group>
</CopyToClipboard>
```

## Способ 2: Копирование вложенных свойств

Это то ж самое, но нажимаем по внутренним свойствам с вложениями (у которых есть красный крестик). 
В этом случае будут скопированы все свойства, входящие в этот элемент.


***
Автор: lxgdark

*Документация поддерживается участниками сообщества [REDkit RU](https://discord.gg/kRTEy8KcNa)*
***