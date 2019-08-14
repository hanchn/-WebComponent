class Component {
  state = {};

  constructor(
    name = "el-helloworld",
    { props = {}, data = {}, style = "", template = "" }
  ) {
    let {
      setState,
      render,
      renderTemplate,
      renderStyle,
      eventBind,
      dataModel
    } = this;
    setState({
      name,
      style: renderStyle(style),
      template: renderTemplate(template)
    });
    render({ props, data, eventBind, dataModel });
  }

  render = ({ props, data, eventBind, dataModel }) => {
    let { state, setState } = this;
    return customElements.define(
      state.name,
      class extends HTMLElement {
        setState = args => setState(agrs);

        getState = this.state;

        state = { ...state, data };
        constructor() {
          super();
          let { initShadow, initProps } = this;
          initProps(props);
          initShadow();
        }

        initShadow = () => {
          let { state } = this;
          let { template, style } = state;
          let shadowRoot = this.attachShadow({ mode: "open" });
          shadowRoot.appendChild(template);
          eventBind(shadowRoot, props);
          dataModel(shadowRoot, state.data);
          shadowRoot.appendChild(style);
          setState({
            shadowRoot
          });
        };

        initProps = props => {
          if (props == {}) return;
          let { state, getState, setState } = this;
          for (let [key, value] of Object.entries(props)) {
            this[key] = value;
          }
        };
      }
    );
  };

  eventBind = (template, event) => {
    for (let i = 0; i < template.children.length; i++) {
      if (template.children[i].getAttribute("bind:click")) {
        template.children[i].addEventListener(
          "click",
          event[template.children[i].getAttribute("bind:click")]
        );
      }
    }
  };

  dataModel = (template, data) => {
    for (let i = 0; i < template.children.length; i++) {
      if (template.children[i].getAttribute("model")) {
        template.children[i].innerText =
          data[template.children[i].getAttribute("model")];
      }
    }
  };

  renderTemplate = template => {
    let templateContent = document.querySelector(template).content;
    let cloneTemplate = document.importNode(templateContent, true);
    return cloneTemplate;
  };

  renderStyle = style => {
    if (style == "" || style == null || style == undefined) return;
    let createStyleEl = document.createElement("style");
    let styleFragment = "";
    for (let [rootKey, rootValue] of Object.entries(style)) {
      styleFragment += `${rootKey}{`;
      for (let [key, value] of Object.entries(rootValue)) {
        styleFragment += `${key}:${
          typeof (value - 0) == "number" && value - 0 == value - 0
            ? value + "px"
            : value
        };`;
      }
      styleFragment += `}`;
    }
    createStyleEl.innerHTML = styleFragment;
    return createStyleEl;
  };

  setState = args => {
    for (let [key, value] of Object.entries(args)) {
      this.state[key] = value;
    }
  };
}
