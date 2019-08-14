class View extends HTMLElement {
  state = {
    show: true,
    createInsertSolt: null,
    opacity: 1,
    direction: "vertical"
  };

  constructor() {
    super();

    this.state.opacity = this.getAttribute("opacity");
    this.state.direction = this.getAttribute("direction");

    let shadowRoot = this.attachShadow({ mode: "open" });
    let createSolt = document.createElement("slot");
    createSolt.setAttribute("name", "mySlot");
    createSolt.innerHTML = "loading...";
    shadowRoot.appendChild(createSolt);

    this.setAttribute("style", `position: relative;`);

    setTimeout(() => {
      let getText = this.getAttribute("text");
      let createInsertSolt = document.createElement("div");
      createInsertSolt.setAttribute("slot", "mySlot");
      createInsertSolt.setAttribute(
        "style",
        "transition: all 1s; position: absolute; left: 0; top: 0;"
      );
      createInsertSolt.innerHTML = getText;
      this.state.createInsertSolt = createInsertSolt;
      this.appendChild(createInsertSolt);
    }, 0);
  }

  connectedCallback() {
    this.addEventListener("click", () => {
      this.state.show = !this.state.show;
      let getInitStyle = this.state.createInsertSolt.getAttribute("style");
      getInitStyle = `transition: all 1s; position: absolute; ${
        this.state.direction == "vertical" ? "left" : "top"
      }: ${this.state.show ? 0 : 100 + "px"}; opacity: ${
        this.state.show ? 1 : this.state.opacity - 0
      };`;
      this.state.createInsertSolt.setAttribute("style", getInitStyle);
    });
  }
}

customElements.define("el-transition", View);
