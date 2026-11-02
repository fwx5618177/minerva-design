import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<!-- prettier-ignore -->
<minerva-code-block language="python" show-line-numbers show-language copyable aria-label="Fibonacci">def fibonacci(n: int) -&gt; list[int]:
    """The first n Fibonacci numbers."""
    numbers = [0, 1]
    while len(numbers) &lt; n:
        numbers.append(numbers[-1] + numbers[-2])
    return numbers[:n]

print(fibonacci(10))</minerva-code-block>
`})))()}n();export{t as default};