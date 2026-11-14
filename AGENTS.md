# 仓库边界与同步规则

- **当前仓库：星杯网页版。** 路径：`E:\GIT\noname_xingbei`；常用分支：`small`；GitHub 远端：`https://github.com/Swift-Rua/noname_xingbei.git`。网页版扩展副本位于 `extension/`。
- **牛牛本地扩展：** `C:\Users\x1334\Desktop\无名杀-win32-x64\resources\app\extension`，Gitee：`https://gitee.com/xyjrua/star_cow.git`。本地游戏直接读取原始音频文件，不使用音频 JSON 清单。
- **无名杯扩展合集：** `E:\GIT\noname_xingbei_extension`，GitHub：`https://github.com/Swift-Rua/noname_xingbei_extension.git`。这是外部下载发布仓库，音频按其现有 JSON 打包、清单和加载方案处理。

这三个目录是不同 Git 仓库和发布目标。开始编辑、同步、提交或推送前，先核对仓库根目录、分支、远端与改动范围。只修改用户当前指定的目标；跨仓库同步时逐项核对资源、代码和清单，不整目录盲目覆盖。更新扩展合集时同步其 `catalog.js` 与对应资源清单。不同仓库的音频与资源加载方式按各自实现维护。
