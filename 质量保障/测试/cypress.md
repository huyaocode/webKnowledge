# cypress 笔记

cypress 是通过模拟用户点击来测试的端到端测试框架，它也允许你编写集成测试与单元测试。

[cypress - 中文文档](https://docs.cypress.io/zh-cn/guides/overview/why-cypress.html#)

### Cypress 为什么好？

- 真实模拟用户点点点，可靠高效
  - 免去开发完成后大量手动去检查的行为，即原本代价很高的 UI 测试。
- 易发现因修改而造成的其他模块 BUG
  - 开发人员开发某个功能，对自己模块的需求多数情况都是完成的不错的，但有时候因为改 A 模块而导致但 B 模块的 BUG 难以用单测发现
- 整个流程拉通，甚至能及时发现后端 BUG
  - 调用真实后端接口，如果原本正常然后突然跑不通，就是后端问题
- 查错方便
  - Cypress 支持录制视频与截图，跑挂了有截图还有当时的报错信息
- 最低成本保证主流程
  - Cypress 属于黑盒测试，Cypress 模拟用户从头到尾使用网站的流程。能最简单又快速的避免那种页面都挂了但还不知道的情况，也是最惨情况。

## 经验

### 隔离环境测试

Cypress 是用的真正的后端数据，而不是 mock 一个数据然后测试组件行为。所以在测试时最好不要使用线上环境，这会使得后端写入很多测试脏数据。最好的就是在专门的沙箱环境测试，如果有租户概念可用新租户，测试时机为发起 MR 代码时。

### Cypress 不适合边界测试、细节测试

Cypress 主要用于跑通主流程，测试的是预期内的东西，而对于有大量计算或复杂判断的纯函数方法而言，单测肯定是更好。

### 对于多分支流程的测试

有的网站的功能之间耦合的、有先后顺序、有分支顺序的。对于多个流程，需要想好系统有几个主流程，有几个分支。以发布文章举例，就有 ：

- 最简单的发布到点赞评论到最后删除
- 系统发现发布内容有敏感词
  - 系统判断不通过
  - 审核
    - 然后审核通过
    - 然后审核不通过

做法：

- 用讲故事的方法串起整个测试
  - 至少描述多个流程，描述在各阶段哪些用户做了哪些操作，填了哪些数据。
  - 在最后执行测试时，按照故事线来测试，而不是按照模块来测试。

注意点：

- 故事数据的抽象
  - 每个故事的数据都抽离到一个单独且唯一的目录下，使得 数据与测试行为分离。
- 测试数据与用例分离
  - 测试用例都通过函数方式调用，清晰可配置

## 技巧

### 在控制台中输出尽可能详细的信息

cypress 主要测试的场景为发起 MR 时，一般是在远程服务器上使用无头模式运行，而 cypress 比单测脆弱，只要有网络不稳定就很容易挂掉。
一旦 CI 挂掉开发人员就需要去查原因，如果通过下载 cypress 报告看录屏或截图的话效率不够高。可以直接在控制台打印内容，方便看出原因，下面两个插件可以帮助输出网络请求的状况，当后端接口错误时直接把响应头和返回值输出到控制台。

```js
plugin中：
require("@cypress/code-coverage/task")(on, config);
require("cypress-terminal-report/src/installLogsPrinter")(on);

support中：
import installLogsCollector from "cypress-terminal-report/src/installLogsCollector";

installLogsCollector({
  printLogs: "always",
  collectTypes: ["cons:error", "cy:xhr", "cy:request", "cy:route"],
  xhr: {
    printHeaderData: true,
  },
  filterLog([type, message]) {
    if (type === "cy:route") {
      const statusCode = Number(get(/Status\:\s+(\d+)/.exec(message), "1"));
      return statusCode >= 300;
    }

    return true;
  },
});
```

### 写健壮的测试

Cypress 测试存在编写测试用例时通过，但之后测试偶发不通过的情况。为了提升稳定性，可从这几个方面来着手：

- wait 等待时间
  - Cypress 等待某个 DOM 出现默认是 4s，但可设置最大的超时时间
  - 如果依赖接口，最好是主动等待接口数据返回时机，而不是固定的写几秒
- 重试
  - 有时后端接口不稳定，或有其他原因，可为测试用例添加几次重试
  - `Cypress.currentTest.retries(重试次数)`
  - 重试之后才跑通其实是有一些不好的，可考虑加个主动上报逻辑
- 选择器
  - 通过文字选 DOM
    - 确定这个文案不经常变化
  - 通过 DOM 结构选择
    - 确认各情况这个 DOM 接口都能取到
    - 有的选择器确实能选中，但点击之后不触发响应，需要传递`{force: true}`

让每个测试用例都可重试一次配置：

```js
afterEach(() => {
  if (Cypress.currentTest.state === "failed") {
    Cypress.runner.stop();
  }
});
```

### setCookie

`setCookie`会在每个`it`之后自动销毁，保证纯洁性，所以需要修改整个`describe`的`cookie`需要在`beforeEach`中使用。参考：https://docs.cypress.io/api/commands/clearcookies.html#Syntax

> Cypress automatically clears all cookies before each test to prevent state from being shared across tests. You shouldn’t need to use this command unless you’re using it to clear a specific cookie inside a single test.

可以设置白名单，使得各用例共享 cookie

```js
Cypress.Cookies.defaults({
  whitelist: ["change-role-user-id"],
});
```

### 查看覆盖率

Cypress 也是可以通过一些配置查看覆盖率的，通过`istanbul`插件就可以做到。
