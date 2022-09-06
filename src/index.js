import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import "./index.css";
import {
  DiagramComponent,
  SymbolPaletteComponent,
  Node,
} from "@syncfusion/ej2-react-diagrams";
import { registerLicense } from "@syncfusion/ej2-base";
import { useRef } from "react";
import { getPorts } from "./utils";

/**
 * Diagram Default sample
 */
//Initializes the nodes for the diagram
registerLicense(
  "ORg4AjUWIQA/Gnt2VVhiQlFadVlJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdk1hUH9ZcXJUQmZZVEA="
);

// 초기화면에 표시될 node데이터입니다. 초기에 빈화면이 보여야 한다면 빈 배열로 변경하시면 됩니다.
const nodes = [
  {
    id: "Terminatori6DRe",
    height: 60,
    offsetX: 300,
    offsetY: 80,
    shape: { type: "Flow", shape: "Terminator" },
    annotations: [
      {
        content: "START",
      },
    ],
  },
  {
    id: "Processhskwd",
    height: 60,
    offsetX: 200,
    offsetY: 160,
    shape: { type: "Flow", shape: "Process" },
    annotations: [
      {
        content: "X=0",
      },
    ],
  },
  {
    id: "ProcessJqwer",
    height: 60,
    offsetX: 400,
    offsetY: 160,
    shape: { type: "Flow", shape: "Process" },
    annotations: [
      {
        content: "Y=1",
      },
    ],
  },
  {
    id: "ProcessnTEoI",
    height: 60,
    offsetX: 200,
    offsetY: 240,
    shape: { type: "Flow", shape: "Process" },
    annotations: [
      {
        content: "X=X+1",
      },
    ],
  },
  {
    id: "ProcessnTEgoI",
    height: 60,
    offsetX: 400,
    offsetY: 240,
    shape: { type: "Flow", shape: "Process" },
    annotations: [
      {
        content: "Y=Y*2",
      },
    ],
  },
  {
    id: "DecisionNbFG2",
    height: 60,
    offsetX: 300,
    offsetY: 330,
    shape: { type: "Flow", shape: "Decision" },
    annotations: [
      {
        content: "X==10",
      },
    ],
  },
  {
    id: "DataAuKdX",
    height: 60,
    offsetX: 450,
    offsetY: 420,
    shape: { type: "Flow", shape: "Data" },
    annotations: [
      {
        content: "X is {X}, Y is {Y}",
        margin: { left: 25, right: 25 },
      },
    ],
  },
  {
    id: "TerminatorLof91",
    height: 60,
    offsetX: 300,
    offsetY: 530,
    shape: { type: "Flow", shape: "Terminator" },
    annotations: [
      {
        content: "END",
      },
    ],
  },
];

// 초기 node간의 연결선 값을 담은 변수입니다. 마찬가지로 초기값이 필요없으면 빈 배열로 변경해주시면 됩니다.
const connectors = [
  { id: "Link1PTTsk", sourceID: "Terminatori6DRe", targetID: "Processhskwd" },
  { id: "Link1QQSCH", sourceID: "Processhskwd", targetID: "ProcessJqwer" },
  { id: "Link1qbdCH", sourceID: "ProcessJqwer", targetID: "ProcessnTEgoI" },
  { id: "Link1qbqtH", sourceID: "ProcessnTEgoI", targetID: "ProcessnTEoI" },
  { id: "Link1ASe6K", sourcePoint:{x:200,y:269}, targetPoint:{x:230,y:329},  },
  { id: "Link1mBs7H", sourceID: "DecisionNbFG2", targetID: "TerminatorLof91", annotations: [{ content: "TRUE", style: { fill: "white" } }]},
  { id: "Link1JiLx2", sourceID: "DataAuKdX", targetID: "ProcessnTEgoI" },
  {
    id: "Link1IgbbG",
    sourcePoint:{x:372,y:330}, 
    targetPoint:{x:378,y:418}, 
    annotations: [{ content: "FALSE", style: { fill: "white" } }],
    segments: [{ direction: "Right", type: "Orthogonal", length: 100}],
  },
];

// 좌측 팔레트에 표시될 shape의 리스트입니다.
const flowshapes = [
  { id: "Terminator", shape: { type: "Flow", shape: "Terminator" } },
  { id: "Process", shape: { type: "Flow", shape: "Process" } },
  { id: "Decision", shape: { type: "Flow", shape: "Decision" } },
  // { id: "Document", shape: { type: "Flow", shape: "Document" } },
  // {
  //   id: "PreDefinedProcess",
  //   shape: { type: "Flow", shape: "PreDefinedProcess" },
  // },
  // { id: "PaperTap", shape: { type: "Flow", shape: "PaperTap" } },
  // { id: "DirectData", shape: { type: "Flow", shape: "DirectData" } },
  // { id: "SequentialData", shape: { type: "Flow", shape: "SequentialData" } },
  // { id: "Sort", shape: { type: "Flow", shape: "Sort" } },
  // { id: "MultiDocument", shape: { type: "Flow", shape: "MultiDocument" } },
  // { id: "Collate", shape: { type: "Flow", shape: "Collate" } },
  // { id: "SummingJunction", shape: { type: "Flow", shape: "SummingJunction" } },
  // { id: "Or", shape: { type: "Flow", shape: "Or" } },
  // { id: "InternalStorage", shape: { type: "Flow", shape: "InternalStorage" } },
  // { id: "Extract", shape: { type: "Flow", shape: "Extract" } },
  // { id: "ManualOperation", shape: { type: "Flow", shape: "ManualOperation" } },
  // { id: "Merge", shape: { type: "Flow", shape: "Merge" } },
  // {
  //   id: "OffPageReference",
  //   shape: { type: "Flow", shape: "OffPageReference" },
  // },
  // {
  //   id: "SequentialAccessStorage",
  //   shape: { type: "Flow", shape: "SequentialAccessStorage" },
  // },
  // { id: "Annotation", shape: { type: "Flow", shape: "Annotation" } },
  // { id: "Annotation2", shape: { type: "Flow", shape: "Annotation2" } },
  { id: "Data", shape: { type: "Flow", shape: "Data" } },
  // { id: "Card", shape: { type: "Flow", shape: "Card" } },
  // { id: "Delay", shape: { type: "Flow", shape: "Delay" } },
];

// 좌측 팔레트에 표시될 연결선에 대한 정보입니다.
const connectorSymbols = [
  {
    id: "Link1",
    type: "Orthogonal",
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 60, y: 60 },
    targetDecorator: {
      shape: "Arrow",
      style: { strokeColor: "#757575", fill: "#757575" },
    },
    style: { strokeWidth: 1, strokeColor: "#757575" },
  },
  // {
  //   id: "link3",
  //   type: "Orthogonal",
  //   sourcePoint: { x: 0, y: 0 },
  //   targetPoint: { x: 60, y: 60 },
  //   style: { strokeWidth: 1, strokeColor: "#757575" },
  //   targetDecorator: { shape: "None" },
  // },
  // {
  //   id: "Link21",
  //   type: "Straight",
  //   sourcePoint: { x: 0, y: 0 },
  //   targetPoint: { x: 60, y: 60 },
  //   targetDecorator: {
  //     shape: "Arrow",
  //     style: { strokeColor: "#757575", fill: "#757575" },
  //   },
  //   style: { strokeWidth: 1, strokeColor: "#757575" },
  // },
  // {
  //   id: "link23",
  //   type: "Straight",
  //   sourcePoint: { x: 0, y: 0 },
  //   targetPoint: { x: 60, y: 60 },
  //   style: { strokeWidth: 1, strokeColor: "#757575" },
  //   targetDecorator: { shape: "None" },
  // },
  // {
  //   id: "link33",
  //   type: "Bezier",
  //   sourcePoint: { x: 0, y: 0 },
  //   targetPoint: { x: 60, y: 60 },
  //   style: { strokeWidth: 1, strokeColor: "#757575" },
  //   targetDecorator: { shape: "None" },
  // },
];

const interval = [
  1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75,
  0.25, 9.75, 0.25, 9.75, 0.25, 9.75,
];

const gridlines = {
  lineColor: "#e0e0e0",
  lineIntervals: interval,
};

const App = () => {
  const instanceRef = useRef();

  var stop = true;

  function parseTransform(transform){
    let [x,y] = transform.split('translate')[1].replace('(','').replace(')','').split(',');
    x = parseFloat(x);
    y = parseFloat(y);
    return [x,y];
  }

  function parseHTML(){
    let nodes = {};

    let types = ['Terminator','Process','Decision','Data'];
    let convertTypes = {'Terminator':'START/END','Process':'EQUATION','Decision':'IF','Data':'OUTPUT'};
    let diagram_space = document.getElementById('diagram-space');

    let parsed_nodes = [];

    for (const type of types){
      parsed_nodes = parsed_nodes.concat(Array.from(diagram_space.querySelectorAll('[id^="'+type+'"][id$="_content_groupElement"]')));
    }
    
    for(const parsed_node of parsed_nodes){
      let node = {};
      node.id = parsed_node.getAttribute('id').replace('_content_groupElement','');
      node.groupElement = document.getElementById(node.id+'_groupElement');
      node.text = node.groupElement.getElementsByTagName('tspan')[0].textContent;
      for (const type of types){
        if (node.id.includes(type)){
          node.type = convertTypes[type];
          if (node.type === 'START/END'){
            node.type = node.text;
          }
          break;
        }
      }

      node.ports = [];
      for (let i=1;i<5;i++){
        let port_transform = document.getElementById(node.id+'_port'+i.toString()).getAttribute('transform');
        let portxy = parseTransform(port_transform);
        node.ports = node.ports.concat([portxy]);
      }
      // node.next = ;
      // node.nextTrue = ;
      // node.nextFalse = ;
      nodes[node.id] = node;
    }

    let parsed_links = Array.from(diagram_space.querySelectorAll('[id^="Link"][id$="path_groupElement"]'));
    for (const parsed_link of parsed_links){
      let connection_id = parsed_link.getAttribute('id').replace('_path_groupElement','');
      let src_transform = document.getElementById(connection_id+'_srcDec').getAttribute('transform');
      let src_xy = parseTransform(src_transform);
      let tar_transform = document.getElementById(connection_id+'_tarDec').getAttribute('transform');
      let tar_xy = parseTransform(tar_transform);
      let src = getClosestNode(src_xy,nodes);
      let dest = getClosestNode(tar_xy,nodes);
      if (src.type === 'IF'){
        let connection_text = document.getElementById(connection_id+'_groupElement').getElementsByTagName('tspan')[0].textContent;
        if (connection_text === 'TRUE'){
          nodes[src.id].nextTrue = dest.id;
        }
        else{
          nodes[src.id].nextFalse = dest.id;
        }
      }
      else{
        nodes[src.id].next = dest.id;
      }
    }
    return nodes;
  }

  function getDistance(a,b){
    return ((a[0]-b[0])**2+(a[1]-b[1])**2)**0.5;
  }

  function getClosestNode(target,nodes){
    let minDistance = 999999;
    let closestNode = NaN;
    for (const key in nodes) {
      let node = nodes[key];
      for(let i = 0; i < node.ports.length; i++){ 
        let port = node.ports[i];
        let dist = getDistance(port,target);
        if (dist<minDistance){
          minDistance = dist;
          closestNode = node;
        }
      }
    }
    return closestNode;
  }

  function variableConsolePrint(variablesDict){
    let printString = "";
    for (const key in variablesDict) {
      printString += key+" = "+variablesDict[key].toString()+"<br>";
    }
    let variablesContent = document.getElementById('variablesContent');
    variablesContent.innerHTML = printString;
    variablesContent.scrollTop = variablesContent.scrollHeight;
  }

  function outputConsolePrint(printString,variablesDict){
    let finalString = "";
    let variableString = "";
    let readingVariable = false;
    for (const char of printString){
      if (char==="{"){
        readingVariable = true;
      }
      else if (char==="}"){
        readingVariable = false;
        finalString+=variablesDict[variableString].toString();
        variableString = "";
      }
      else{
        if (readingVariable){
          variableString += char;
        }
        else{
          finalString += char;
        }
      }
    }
    finalString+="<br>";
    let outputContent = document.getElementById('outputContent');
    outputContent.innerHTML += finalString;
    outputContent.scrollTop = outputContent.scrollHeight;
  }

  function splitSign(string,symbols){
    string = string.replaceAll(' ', '');
    for (const symbol of symbols){
      if (string.includes(symbol)){
        let [LHS,RHS] = string.split(symbol);
        return [LHS,symbol,RHS];
      }
    }
  }

  function evaluateExpression(string,variablesDict){
    if (!isNaN(parseFloat(string))){
      return parseFloat(string);
    }
    if (string in variablesDict){
      return variablesDict[string];
    }
    let [LHS,op,RHS] = splitSign(string,['+','-','*','/']);
    if (isNaN(parseFloat(LHS))){
      LHS = parseFloat(variablesDict[LHS]);
    }
    else{
      LHS = parseFloat(LHS);
    }
    if (isNaN(parseFloat(RHS))){
      RHS = parseFloat(variablesDict[RHS]);
    }
    else{
      RHS = parseFloat(RHS);
    }
    if (op==='+'){
      return LHS+RHS;
    }
    if (op==='-'){
      return LHS-RHS;
    }
    if (op==='*'){
      return LHS*RHS;
    }
    if (op==='/'){
      return LHS/RHS;
    }
  }

  function evaluateIF(string,variablesDict){
    let [LHS,op,RHS] = splitSign(string,['>','>=','<','<=','==']);
    LHS = evaluateExpression(LHS,variablesDict);
    RHS = evaluateExpression(RHS,variablesDict);
    if (op==='>'){
      return LHS>RHS;
    }
    if (op==='>='){
      return LHS>=RHS;
    }
    if (op==='<'){
      return LHS<RHS;
    }
    if (op==='<='){
      return LHS<=RHS;
    }
    if (op==='=='){
      return LHS==RHS;
    }
  }
    
  function evaluateEquation(string,variablesDict){
    let [LHS,op,RHS] = splitSign(string,['=']);
    RHS = evaluateExpression(RHS,variablesDict);
    variablesDict[LHS] = parseFloat(RHS);
  }

  function removeHighlight(){
    let nodes = parseHTML();
    for (const key in nodes) {
      let node = nodes[key];
      node.groupElement.getElementsByTagName('path')[0].classList.remove('currentNodeHighlight');
    }
  }

  function highlightNode(node){
    removeHighlight();
    node.groupElement.getElementsByTagName('path')[0].classList.add('currentNodeHighlight');
  }

  function doStep(nodes,currentNode,variablesDict){
    highlightNode(currentNode);
    if (currentNode.type === 'START'){
      currentNode = nodes[currentNode.next];
    }
    else if (currentNode.type === 'EQUATION'){
      evaluateEquation(currentNode.text,variablesDict)
      currentNode = nodes[currentNode.next];
    }
    else if (currentNode.type === 'IF'){
      if (evaluateIF(currentNode.text,variablesDict)){
        currentNode = nodes[currentNode.nextTrue];
      }
      else{
        currentNode = nodes[currentNode.nextFalse];
      }
    }
    else if (currentNode.type === 'OUTPUT'){
      outputConsolePrint(currentNode.text,variablesDict);
      currentNode = nodes[currentNode.next];
    }
    return [currentNode,variablesDict];
  }

  function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
  }

  async function play(){
    let nodes = parseHTML();
    let currentNode = undefined;
    for (const node_id in nodes){
      let node = nodes[node_id];
      if (node.type === "START"){
        currentNode = node;
      }
      break;
    }
    let variablesDict = {};
    while (currentNode.type !== 'END'){
      if (stop){
        return;
      }
      [currentNode,variablesDict] = doStep(nodes,currentNode,variablesDict);
      variableConsolePrint(variablesDict);
      await delay(200);
    }
    highlightNode(currentNode);
  }

  function handleClick(e) {
    e.preventDefault();
    if (e.target.id==='playButton'){
      if (stop){
        console.log('play');
        stop = false;
        play();
      }
    }
    else if (e.target.id==='stopButton'){
      console.log('stop');
      removeHighlight();
      stop = true;
    }
  }

  useEffect(() => {
    // play();
  });

  return (
    <div className="control-pane">
      <div className="control-section">
        <div style={{ width: "100%" }}>
          <div id="palette-space" className="sb-mobile-palette">
            <SymbolPaletteComponent
              id="symbolpalette"
              expandMode="Multiple"
              palettes={[
                {
                  id: "flow",
                  expanded: true,
                  symbols: flowshapes,
                  iconCss: "e-diagram-icons1 e-diagram-flow",
                  title: "Flow Shapes",
                },
                {
                  id: "connectors",
                  expanded: true,
                  symbols: connectorSymbols,
                  iconCss: "e-diagram-icons1 e-diagram-connector",
                  title: "Connectors",
                },
              ]}
              width={"100%"}
              height={"300px"}
              symbolHeight={50}
              symbolWidth={50}
              getNodeDefaults={(symbol) => {
                if (
                  symbol.id === "Terminator" ||
                  symbol.id === "Process" ||
                  symbol.id === "Delay"
                ) {
                  symbol.width = 80;
                  symbol.height = 40;
                } else if (
                  symbol.id === "Decision" ||
                  symbol.id === "Document" ||
                  symbol.id === "PreDefinedProcess" ||
                  symbol.id === "PaperTap" ||
                  symbol.id === "DirectData" ||
                  symbol.id === "MultiDocument" ||
                  symbol.id === "Data"
                ) {
                  symbol.width = 50;
                  symbol.height = 40;
                } else {
                  symbol.width = 50;
                  symbol.height = 50;
                }
                symbol.style.strokeColor = "#757575";
              }}
              symbolMargin={{ left: 15, right: 15, top: 15, bottom: 15 }}
              getSymbolInfo={(symbol) => {
                return { fit: true };
              }}
            />
          <div class='consoleDiv'><div class='consoleTitle'>Variables</div><div class='consoleContent' id='variablesContent'></div></div>
          <div class='consoleDiv'><div class='consoleTitle'>Output</div><div class='consoleContent' id='outputContent'></div></div>
          </div>
          <div id="diagram-space" className="sb-mobile-diagram">
            <div id='controller'>
              <button id='playButton' class='controllerButton' onClick={handleClick}>play</button>
              <button id='stopButton' class='controllerButton' onClick={handleClick}>stop</button>
            </div>
            <DiagramComponent
              id="diagram"
              ref={(diagram) => (instanceRef.current = diagram)}
              width={"100%"}
              height={"700px"} // 캔버스의 높이를 지정합니다.
              snapSettings={{
                horizontalGridlines: gridlines,
                verticalGridlines: gridlines,
              }}
              nodes={nodes}
              connectors={connectors}
              getNodeDefaults={(node) => ({
                // 초기 node들의 크기/색상 등 모양을 지정합니다.
                width: 145,
                style: { fill: "#357BD2", strokeColor: "white" },
                annotation: [
                  { style: { color: "white", fill: "transparent" } },
                ],
                ports: getPorts(node),
              })}
              getConnectorDefaults={(obj) => {
                // 초기 connector들의 모양을 지정합니다.
                if (obj.id.indexOf("connector") !== -1) {
                  obj.type = "Orthogonal";
                  obj.targetDecorator = {
                    shape: "Arrow",
                    width: 10,
                    height: 10,
                  };
                }
              }}
              dragEnter={(args) => {
                let obj = args.element;
                if (obj instanceof Node) {
                  let oWidth = obj.width;
                  let oHeight = obj.height;
                  let ratio = 100 / obj.width;
                  obj.width = 100;
                  obj.height *= ratio;
                  obj.offsetX += (obj.width - oWidth) / 2;
                  obj.offsetY += (obj.height - oHeight) / 2;
                  obj.style = { fill: "#357BD2", strokeColor: "white" };
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("sample"));
root.render(<App />);
