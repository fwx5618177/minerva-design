import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import CodeBlock from "@layout/CodeBlock";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";
const example = `import { useState } from 'react';
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
}`;
export default function ReactNativeDoc() {
  const { t } = useTranslation();
  return (
    <DocPage id="react-native">
      <section className={styles.section}>
        <p className={styles.prose}>{t("docs.react-native.setup")}</p>
        <CodeBlock
          language="bash"
          code="pnpm add minerva-design\nnpx expo install react-native-safe-area-context react-native-svg"
        />
        <CodeBlock language="tsx" code={example} />
        <p className={styles.prose}>{t("docs.react-native.validation")}</p>
        <Link to="/platform-support">{t("docs.platform-support.title")}</Link>
      </section>
    </DocPage>
  );
}
