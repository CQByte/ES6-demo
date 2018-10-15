var expect = require('chai').expect;

/**
 * JavaScript's String type is used to represent textual data.
 * It is a set of "elements" of 16-bit unsigned integer values  (UTF-16 code units)
 *
 * Unicode的编码空间从U+0000到U+10FFFF,共有1,112,064个码位可以用来映射字符；
 *
 * Unicode的编码空间可划分为17个平面，每个平面包括65,536(即2^16) 个码位。
 * 17个平面的码位可表示为U+xx0000到U+xxFFFF,其中xx表示平面，从0x00到0x10。
 *
 * 第一个平面称为基本多语言平面，其它平面称为辅助平面.
 *
 * 基本多语言平面内的U+D800到U+DFFF之间的码位是永久保留的，不会映射到任何Unicode字符。
 */
describe("字符串的扩展", function () {

	it('字符表示法', function () {
		let str = [
				'1:a',            //
				'2:\075',         // 反斜杠后面紧跟三个八进制数（000到377)
				'3:\xA9',         // Unicode码点-Hexadecimal escape sequences；\x后面紧跟两个十六进制数（00到FF）
				'4:\u0061',       // Unicode码点-Unicode escape sequences;     \u后面紧跟至少四个十六进制数（0000到FFFF）
												  //  超出这个范围的字符，必须用两个双字节的形式表示。
				'5:\u{20BB7}',    // Unicode码点-Unicode code point escapes;  𠮷 Unicode码点（0到10FFFF）,
				'6:\uD842\uDFB7', // UTF-16代理对
				'7:\u20BB7',      // 在\u后面跟上超过0xFFFF的数值，JavaScript 理解成\u20BB和7两个字符。
		]
		console.log(str)
	});

	it('转义字符', function () {
		console.log(
				'null（\\u0000）:测试\0字符串',
				'后退键（\\u0008）:测试\b字符串',//浏览器环境貌似没用
				'换页符（\\u000C）:测试\f字符串',
				'换行符（\\u000A）:测试\n字符串',//在html中要设置innerText，使用innerHtml要使用实体字符
				'回车键（\\u000D）:测试\r字符串',
				'制表符（\\u0009）:测试\t字符串',
				'垂直制表符（\\u000B）:测试\v字符串',
				'单引号（\\u0027）:测试\'字符串',
				'双引号（\\u0022）:测试\"字符串',
				'斜杠（\\u005C）:测试\\字符串',
		)
	});

	it('codePointAt', function () {
		//JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为2个字节。
		// 对于那些需要4个字节储存的字符（Unicode 码点大于0xFFFF的字符），JavaScript 会认为它们是两个字符。

		let a = '\uD842\uDFB7好'

		expect(a.length).to.be.equal(3)

		console.log(a.charAt(0))
		console.log(a.charAt(2))
		console.log(a.charCodeAt(0).toString(16))  //d842
		console.log(a.charCodeAt(1).toString(16))  //dfb7
		console.log(a.codePointAt(0).toString(16)) //20bb7
		console.log(a.codePointAt(1).toString(16)) //dfb7
	});

	it('使用for...in遍历每个字符', function () {
		let a = '\uD842\uDFB7好'
		for (let ch in a) {
			console.log(ch, ':', a[ch], a[ch].codePointAt(0).toString(16));
		}
	});

	it('遍历器最大的优点是可以识别大于0xFFFF的码点', function () {
		let a = '\uD842\uDFB7好'
		for (let ch of a) {
			console.log(ch, ch.codePointAt(0).toString(16));
		}
	});

	it('fromCodePoint 不能识别 32 位的 UTF-16 字符（Unicode 编号大于0xFFFF）。', function () {
		console.log(String.fromCharCode(0x00BB7))
		console.log(String.fromCharCode(0x20BB7))
		console.log(String.fromCodePoint(0x20BB7))
	});

	it('', function () {

	});

})