# BMAD-METHOID

[github 地址](https://github.com/bmad-code-org/BMAD-METHOD/blob/main/dist/teams/team-fullstack.txt)

复制全部内容，找到`chatgpt`或`Gemini`里创建智能体，粘贴上述提示词即可

---

BMAD-METHOD 是一个通用的 AI Agent 系统，专为敏捷驱动开发而设计，通过一个两阶段架构将软件开发过程转化为规划（Web UI）与实现（IDE）分离，使用自然语言代理在整个开发生命周期中保持上下文一致性。通俗的理解就是文档设计相关的可以在 Web Chat 上去做，比如我常用的 chat.qwen.ai、chat.z.ai、kimi.com 等等，只需要把仓库中 410kb 的提示词 dist/teams/team-all.txt 或者 dist/teams/team-fullstack.txt 作为附件，就能友好地和产品经理、架构师、开发等沟通既定主题的项目任务了。接着在 IDE 如 claude code、cursor、trae 等中安装

## Gemini

[https://gemini.google.com/gem/2c134295afba/8b83c655dff1d41a](https://gemini.google.com/gem/2c134295afba/8b83c655dff1d41a)

配置这个智能体之后，输入`/help`之后回复的内容

```markdown
I am a BMad Master Orchestrator, an AI assistant specialized in the BMad-Method framework. I can help you coordinate workflows, manage multi-agent tasks, and provide guidance on which specialist agent to use.

Here are the commands I can respond to:

---

### **BMad Orchestrator Commands**

All commands must start with `*` (asterisk)

**Core Commands:**

- `*help` ............... Show this guide
- `*chat-mode` .......... Start conversational mode for detailed assistance
- `*kb-mode` ............ Load full BMad knowledge base
- `*status` ............. Show current context, active agent, and progress
- `*exit` ............... Return to BMad or exit session

**Agent & Task Management:**

- `*agent [name]` ....... Transform into a specialized agent (list if no name)
- `*task [name]` ........ Run a specific task (list if no name, requires agent)
- `*checklist [name]` ... Execute a checklist (list if no name, requires agent)

**Workflow Commands:**

- `*workflow [name]` .... Start a specific workflow (list if no name)
- `*workflow-guidance` .. Get personalized help selecting the right workflow
- `*plan` ............... Create a detailed workflow plan before starting
- `*plan-status` ........ Show current workflow plan progress
- `*plan-update` ........ Update a workflow plan status

**Other Commands:**

- `*yolo` ............... Toggle skip confirmations mode
- `*party-mode` ......... Group chat with all agents
- `*doc-out` ............ Output a full document

---

### **Available Specialist Agents**

- `*agent analyst`: **Business Analyst**
  - **When to use:** For market research, brainstorming, competitive analysis, and initial project discovery.
  - **Key deliverables:** Project briefs, market research reports, competitive analysis reports.
- `*agent pm`: **Product Manager**
  - **When to use:** For creating PRDs, product strategy, feature prioritization, and roadmap planning.
  - **Key deliverables:** Product Requirement Documents (PRDs), epics, and user stories.
- `*agent ux-expert`: **UX Expert**
  - **When to use:** For UI/UX design, wireframes, prototypes, and front-end specifications.
  - **Key deliverables:** UI/UX specifications, AI-powered UI generation prompts.
- `*agent architect`: **Architect**
  - **When to use:** For system design, architecture documents, technology selection, and infrastructure planning.
  - **Key deliverables:** Architecture documents, API designs, data models, source tree diagrams.
- `*agent po`: **Product Owner**
  - **When to use:** For backlog management, story refinement, creating acceptance criteria, and sprint planning.
  - **Key deliverables:** Story documents, epic validations, and checklist reports.

---

### **Available Workflows**

- `*workflow brownfield-fullstack`: **Brownfield Full-Stack Enhancement**
  - **Purpose:** To enhance an existing full-stack application with new features or modernization.
- `*workflow brownfield-service`: **Brownfield Service/API Enhancement**
  - **Purpose:** To enhance an existing backend service or API with new features or performance improvements.
- `*workflow brownfield-ui`: **Brownfield UI/Frontend Enhancement**
  - **Purpose:** To enhance an existing frontend application with new features or design improvements.
- `*workflow greenfield-fullstack`: **Greenfield Full-Stack Application Development**
  - **Purpose:** To build a new full-stack application from concept to development.
- `*workflow greenfield-service`: **Greenfield Service/API Development**
  - **Purpose:** To build a new backend service or API from concept to development.
- `*workflow greenfield-ui`: **Greenfield UI/Frontend Development**
  - **Purpose:** To build a new frontend application from concept to development.

---

I'm ready to assist you. To get started, you can either select one of the available agents or a workflow. What would you like to do?
```

## 具体使用案例

[https://blog.csdn.net/sinat_34365157/article/details/149829394](https://blog.csdn.net/sinat_34365157/article/details/149829394)
