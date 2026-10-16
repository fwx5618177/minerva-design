import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{r as t}from"./native-preview-BRFLbKzw.js";import{o as n,t as r}from"./react-vendor-CVmG4vV9.js";import{Dt as i,Ot as a}from"./io5-BAuU0sG1.js";import{n as o,t as s}from"./CodeBlock-NTdASSxk.js";import{i as c,r as l}from"./DemoBlock-B5Eyqqua.js";import{n as u,t as d}from"./DocPage-BJtkZ4N3.js";function f(){let{t:e}=a();return(0,p.jsx)(d,{id:`react-native`,children:(0,p.jsxs)(`section`,{className:l.section,children:[(0,p.jsx)(`p`,{className:l.prose,children:e(`docs.react-native.setup`)}),(0,p.jsx)(s,{language:`bash`,code:`pnpm add minerva-design\\nnpx expo install react-native-safe-area-context react-native-svg`}),(0,p.jsx)(s,{language:`tsx`,code:m}),(0,p.jsx)(`p`,{className:l.prose,children:e(`docs.react-native.validation`)}),(0,p.jsx)(r,{to:`/platform-support`,children:e(`docs.platform-support.title`)})]})})}var p,m;function h(){return(h=e((()=>{i(),n(),o(),u(),c(),p=t(),m=`import { useState } from 'react';
import { Text } from 'react-native';
import { MinervaProvider, Button, Input, Switch } from 'minerva-design/native';

function Form() {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState('');
  const [checked, setChecked] = useState(false);
  return <>
    <Input value={name} onChange={setName} placeholder="Name" />
    <Switch checked={checked} onChange={setChecked} />
    <Button onPress={() => setSaved(name)}>Save</Button>
    <Text>{saved}</Text>
  </>;
}
export default function App() {
  return <MinervaProvider><Form /></MinervaProvider>;
}`})))()}h();export{f as default};