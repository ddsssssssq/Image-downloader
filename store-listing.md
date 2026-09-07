# Chrome Web Store 上架资料

适用软件包：`Image downloader` 1.2.1

## 上架前状态

- 安装包已准备：`Image-downloader-1.2.1.zip`
- 128×128 图标已包含在安装包中
- 440×280 小型宣传图已准备：`store-assets/small-promo.jpg`
- 1400×560 横幅宣传图已准备：`store-assets/marquee-promo.jpg`
- 真实功能截图尚未补拍；请在当前版本实际运行后截取至少 1 张 1280×800 或 640×400 截图
- 隐私政策正文已准备，但需要部署到无需登录即可访问的 HTTPS 地址
- 主页、支持页和官方网址尚未提供，不要填写虚构地址

## Product details

### Name

```text
Image downloader
```

### Short description

```text
Find images on the current webpage, preview them, select what you need, and download them in one click.
```

### Category

```text
Productivity
```

### Detailed description (English)

```text
Image downloader helps you find image resources on the webpage you are currently viewing, preview them, choose the images you want, and start downloads with one click.

Features:
• Scan images from img elements, responsive srcset, common lazy-loading attributes, CSS background images, SVG image elements, page metadata, and open Shadow DOM.
• Preview detected images in a right-side floating panel.
• Select individual images, select all, filter by minimum size, and sort by page order or image dimensions.
• Use Deep scan to scroll through long pages and trigger more lazy-loaded content.
• Download all or selected images with progress updates, automatic retries, and cancellation for pending downloads.
• Choose the interface language or follow the browser language. Supported interface languages include English, Chinese, Japanese, Korean, Spanish, French, German, Portuguese, and Russian.

How to use:
1. Open a normal HTTP or HTTPS webpage.
2. Click the Image downloader toolbar icon.
3. Review the detected images in the floating panel.
4. Select images or download all of them.

No account or login is required. The extension does not operate its own server, analytics system, advertising system, or AI service. Page scanning and filtering are performed locally in the browser. The extension may not be able to preview or download images protected by authentication, hotlink protection, expired URLs, closed Shadow DOM, or canvas-only rendering.
```

### Detailed description (简体中文)

```text
Image downloader 用于识别当前网页中的图片资源，让你在右侧悬浮面板中预览、选择并一键下载图片。

主要功能：
• 识别 img、响应式 srcset、常见懒加载属性、CSS 背景图、SVG 图片、页面元数据和开放 Shadow DOM。
• 在网页右侧悬浮面板中预览图片。
• 支持单张选择、全选、最小尺寸过滤，以及按页面顺序或图片尺寸排序。
• 使用“深度扫描”滚动长页面，触发更多懒加载内容。
• 支持下载全部或选中图片，显示下载进度，失败自动重试，并可取消尚未启动的下载。
• 支持手动切换语言或跟随浏览器语言，界面支持中文、English、日本語、한국어、Español、Français、Deutsch、Português 和 Русский。

使用方法：
1. 打开普通的 HTTP 或 HTTPS 网页。
2. 点击浏览器工具栏中的 Image downloader 图标。
3. 在右侧悬浮面板中查看识别结果。
4. 选择图片，或直接下载全部图片。

插件无需账号或登录，不运行自有服务器、分析系统、广告系统或 AI 服务。页面扫描和筛选在浏览器本地完成。受登录权限、防盗链、失效 URL、闭合 Shadow DOM 或仅存在于 Canvas 中等因素影响，部分图片可能无法预览或下载。
```

## Privacy practices tab

## 后台截图对应的中文可复制内容

### 说明（不超过 16,000 字符）

```text
Image downloader 是一款用于识别和下载当前网页图片的浏览器扩展。

用户点击浏览器工具栏中的 Image downloader 图标后，扩展会在当前网页右侧打开悬浮面板，并识别页面中可访问的图片资源，包括 img 图片、响应式 srcset、常见懒加载属性、CSS 背景图、SVG 图片、页面图片元数据和开放 Shadow DOM 中的图片。

主要功能：
• 以缩略图形式预览识别到的图片。
• 单独选择图片、全选或取消全选。
• 按最小尺寸过滤图片，并按页面顺序、图片尺寸从大到小或从小到大排序。
• 使用“深度扫描”滚动长页面，以触发更多懒加载内容。
• 下载全部图片或下载选中的图片。
• 显示批量下载启动进度，对失败的下载请求自动重试，并支持取消尚未启动的下载。
• 支持中文、English、日本語、한국어、Español、Français、Deutsch、Português 和 Русский，也可以跟随浏览器语言。

使用方法：
1. 打开普通的 HTTP 或 HTTPS 网页。
2. 点击浏览器工具栏中的 Image downloader 图标。
3. 在右侧悬浮面板中查看识别结果。
4. 选择图片，或点击下载全部。

扩展无需账号、登录或外部服务器。页面扫描、图片筛选和语言设置处理在浏览器本地完成。扩展不运行广告、分析或 AI 服务，也不执行远程代码。

由于浏览器权限、登录状态、防盗链、失效 URL、闭合 Shadow DOM 或 Canvas 渲染等限制，部分图片可能无法预览或下载。浏览器内部页面不支持扫描。
```

### 单一用途说明

```text
Image downloader 的单一用途是：在用户主动点击扩展图标后，识别当前网页中可访问的图片资源，让用户在悬浮面板中预览、筛选和选择图片，并下载用户选择的图片。
```

### activeTab 权限理由

```text
用户点击 Image downloader 工具栏图标后，扩展需要临时访问当前活动标签页，读取网页中的图片元素、图片资源地址和尺寸，以便生成图片预览、筛选列表和用户选择的下载任务。扩展不会在用户主动调用之前自动读取网页，也不获得对所有网站的持久访问权限。
```

### downloads 权限理由

```text
当用户点击“下载全部”或“下载选中”后，扩展使用 Chrome Downloads API 启动用户选择的图片下载，显示批量下载启动进度，对失败请求进行有限次数重试，并在用户点击取消时取消尚未完成的下载任务。该权限仅用于执行用户明确发起的图片下载操作。
```

### scripting 权限理由

```text
用户点击扩展图标后，扩展需要向当前活动标签页注入安装包内的本地脚本，以创建右侧悬浮面板、扫描网页图片、执行可选的深度扫描、应用图片筛选和排序。扩展不加载或执行远程脚本。
```

### storage 权限理由

```text
扩展使用 chrome.storage.local 保存用户选择的界面语言，使下一次使用时保持该偏好。扩展不会将网页正文、图片像素、浏览历史或下载 URL 写入扩展存储。
```

### Single purpose description

```text
Image downloader has one purpose: after the user explicitly invokes the extension, it identifies image resources on the active webpage, lets the user preview and select them, and starts downloads for the images selected by the user.
```

### Permission justifications

`activeTab`

```text
When the user clicks the Image downloader toolbar icon, the extension receives temporary access to the active webpage so it can inspect image elements and image resource URLs for the requested scan. It does not automatically access webpages before user invocation.
```

`scripting`

```text
The extension injects its local content script into the active tab after the user clicks the toolbar icon. The script creates the floating panel, scans the page DOM, triggers the optional deep scan, and performs local image filtering.
```

`downloads`

```text
The extension uses the Chrome Downloads API to start downloads for the image URLs the user selected, report download-start progress, retry failed download requests, and cancel pending downloads when the user requests cancellation.
```

`storage`

```text
The extension stores the user's interface-language preference in chrome.storage.local so the next use can keep the selected language. It does not store scanned page content, image pixels, page history, or download URLs in extension storage.
```

### Host permissions

```text
No persistent host permission is requested. The extension uses activeTab and scripting only after the user invokes the toolbar action on the current page.
```

### Remote code

```text
No. The extension contains no remotely hosted or dynamically downloaded executable code.
```

### Data usage disclosure

In the dashboard, select only the data categories that match its current wording. The implementation handles:

- Website content/resources: the current page DOM and image resource URLs are read after the user invokes a scan, and are processed in memory to build the selection panel.
- Browsing activity: the current active page URL and image URLs are handled only as part of the user-requested scan and download operation.

Do not claim that the extension handles no user data. It does not transmit page data to an extension-owned server, sell it, or use it for advertising, credit, or analytics.

### Limited Use certification

If the dashboard presents the standard Limited Use certification statements, review and accept them only after confirming that the disclosures above and the linked privacy policy are accurate for the final uploaded package.

## Reviewer test instructions

```text
No extension account or login is required.

1. Open a normal HTTPS page containing several visible images, such as a public article or image gallery.
2. Click the Image downloader toolbar icon. A floating panel should open on the right side of the page.
3. Confirm that detected images appear as thumbnails. Use Select all or select individual thumbnails.
4. Test the minimum-size filter and the sorting selector. Use Deep scan on a long page with lazy-loaded content.
5. Click Download selected or Download all. Confirm that downloads start and that progress is shown. Test Cancel while a batch is starting.
6. Open the language selector and switch between English, Chinese, and another supported language. Select Follow browser to use the browser locale.
7. Confirm that no login, account, server, or external website is required by the extension.

Known limitations: browser-internal pages cannot be scanned; images requiring authentication, hotlink protection, expired URLs, closed Shadow DOM, or canvas-only rendering may not be available for preview or download.
```

## Links and unresolved items

- Promotional video URL (standard format): `https://www.youtube.com/watch?v=cVRv1IM0eig`
- Proposed privacy policy URL after GitHub Pages deployment: `https://ddssssssq.github.io/Image-downloader/privacy-policy.html` (not yet verified live).
- GitHub support URL: `https://github.com/ddssssssq/Image-downloader/issues`.
- Homepage URL: leave empty unless a real public product page exists.
- Support URL: leave empty unless a real support page or issue tracker exists.
- Official URL: do not select one unless the domain has been verified in the developer account.
- Screenshots: capture the actual current 1.2.1 UI after reloading the unpacked extension; do not use a mockup or an older screenshot.
