# 使用 react context 共享数据

## 前言

在有了搜索组件和结果组件之后，我们需要实现搜索的功能，需要我们针对搜索框输入的内容来批评结果框里的内容

## 使用 context 来保存数据

新建 `src/renderer/src/context/CodeContext.tsx`

```tsx
import { DataType } from "@renderer/data";
import { createContext, Dispatch, SetStateAction } from "react";

interface ContextProps {
  data: DataType[];
  setData: Dispatch<SetStateAction<DataType[]>>;
}

export const CodeContext = createContext<ContextProps | undefined>(undefined);
```

---

`src/renderer/src/App.tsx`

```tsx
import { useState } from "react";
import Result from "./components/Result";
import Search from "./components/Search";
// 这里应用的时候原先的export的改名为codes了
import { codes } from "@renderer/data";
import { CodeContext } from "./context/CodeContext";

function App(): JSX.Element {
  const [data, setData] = useState(codes);
  return (
    <CodeContext.Provider value={{ data, setData }}>
      <Search />
      <Result />
    </CodeContext.Provider>
  );
}

export default App;
```

## 使用 react hooks 管理我们的数据
