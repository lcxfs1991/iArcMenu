<h1 id="intro">iArcMenu</h1>

iArcMenu是一个灵活易用的移动端弹出菜单组件，它具有如下特性

* 有效支持移动设备，并有根据屏幕自适应
* 支持多种弹出效果，包括 arc （圆形)， line（线形）, static（静止），添加相应参数还能得到子弹（bullet）效果
* 你能够简易地添加回调函数(callback)


<h2 id="getting-started">开始部署iArcMenu</h2>
部署iArcMenu最容易的办法是查阅我们提供的简易例子。大部份代码存放在demo文件夹的文件里面。*iArcMenu* 是必要新建的一个类。


在你开始之前，请务必将src文件夹置于你项目文件夹下面，必调用里面的javascript和css文件。
* common.css
* iarcmenu.js

你需要为iArcMenu先新建好数据:

``` javascript
var list = [
        {
            content: "用户",
            scale: 1.5,
            callback: function() {
                alert(this.innerHTML);
            }
        },
        {
            content: "朋友",
            scale: 1.5,
            callback: function() {
                alert(this.innerHTML);
            }
        },
        {
            content: "设置",
            scale: 1.5,
            callback: function() {
                alert(this.innerHTML);
            }
        }
```

HTML代码如下:
	
<div id="iArcMenu-content"></div>

要使其运行，按下面例子新建iArcMenu类: 

 	<script type="text/javascript">
    	var opt = {
        data: list,
        dom: document.getElementById('iArcMenu-content'),
        type: 'arc',
        duration: 100,
        rangeDegree: 180,
        offsetDegree: 90,
        distance: 150,
        diameter: 100,
    };

    var arcMenu = new iArcMenu(opt);
    </script>


<h2 id="configuration">配置iArcMenu</h2>


<h2 id="understanding">深入了解iArcMenu</h2>
这里提供对iArcMenu类选项最清楚的描述: 
<table>
<thead>
	<tr>
		<td>选项</td>
		<td>数值</td>
		<td>解释</td>
	</tr>
</thead>
<tbody>
	<tr>
		<td>dom</td>
		<td>HTML Object</td>
		<td>包含菜单的包裹DOM元素</td>
	</tr>
	<tr>
		<td>data</td>
		<td>Array of Content</td>
		<td>菜单数据
			如果没有背景图片，则可以通过content传入文字。
			<pre>
			{
	            content: "用户",
	            class: 'icon icon-home3',
	            scale: 1.5,
	            callback: function() {
	                alert(this.innerHTML);
	            }
	        },
	        </pre>
		</td>
	</tr>
	<tr>
		<td>type</td>
		<td>String</td>
		<td>菜单种类 (arc, line, static)</td>
	</tr>
	<tr>
		<td>distance</td>
		<td>Integer</td>
		<td>菜单离开控制按钮的距离，默认100px</td>
	</tr>
	<tr>
		<td>offsetDegree</td>
		<td>Integer</td>
		<td>初始角度，默认为0度，即正右方，x轴正方向</td>
	</tr>
	<tr>
		<td>rangeDegree</td>
		<td>Integer</td>
		<td>适用于菜单arc种类，表示展开的范围，默认360度</td>
	</tr>
	<tr>
		<td>diffDist</td>
		<td>Integer</td>
		<td>适用于菜单line种类，表示菜单之间的间距</td>
	</tr>
	<tr>
		<td>diameter</td>
		<td>Integer</td>
		<td>菜单直径</td>
	</tr>
	<tr>
		<td>duration</td>
		<td>Integer (1000 == 1s)</td>
		<td>动画启动间隔</td>
	</tr>
	<tr>
		<td>durationOffset</td>
		<td>Integer (1000 == 1s)</td>
		<td>菜单之间动画间隔</td>
	</tr>
	<tr>
		<td>callback</td>
		<td>Function</td>
		<td>点击后的回调</td>
	</tr>
</tbody>
</table>

<h2 id="license">License (MIT)</h2>

Copyright (c) 2014 BE-FE

[MIT](https://github.com/BE-FE/iArcMenu/blob/master/LICENSE)
