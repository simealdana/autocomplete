1. **What is the difference between Component and PureComponent? Give an example where it might break my app.**
   
   Component is the base for creating components in React. When a component updates (e.g., due to a change in state or props), Component doesn't compare the current props or state with the previous props or state; it simply re-renders. PureComponent performs a shallow comparison of props and state. If the props and state haven't changed, it avoids re-rendering the component.

   Consider PureComponent as the components where we use React.memo when using functional components.

   Example where it might break the app:
   Suppose you pass an object as a prop to MyPureComponent or MyFunctionalComponent:
   ```js
   <MyPureComponent data={{ value: 1 }} />
   ```

   Even if the internal value of the object (`value`) doesn't change, every time the parent component renders, a new object is passed to MyPureComponent, causing MyPureComponent to also re-render. This is because the shallow comparison detects that they are different objects (even if they have the same content). This could lead to suboptimal performance and unnecessary re-renders.

   And yes, you can do something similar to PureComponent with functional components using React.memo, as shown in the previous example.

2. **Context + ShouldComponentUpdate might be dangerous. Why is that?**

   - `shouldComponentUpdate` determines if a component should re-render. If it returns false, the component and its children won't re-render.
   - If a component using `shouldComponentUpdate` is subscribed to a Context, and `shouldComponentUpdate` returns false, the component won't re-render even if the Context values change. This can lead to the component not reflecting changes in the Context.

3. **Describe 3 ways to pass information from a component to its PARENT.**

   - Callbacks: This is the most common way. The parent component passes a function to the child component through props. The child component calls this function and passes data when needed.

   ```js
   function Parent() {
       const handleData = (data) => {
           console.log(data);
       };

       return <Child sendData={handleData} />;
   }

   function Child({ sendData }) {
       sendData("data from child");
       return <div>Child Component</div>;
   }
   ```

   - Lifting State Up: Instead of keeping the state in the child component, it's kept in the parent component and passed to the child through props. When the state needs updating, the child invokes a function from the parent (passed through props) to update the state.

   - Forwarding Refs (forwardRef): `forwardRef` is mainly used to access a DOM or a component instance in a child component from a parent component. Although not its primary use, it can also be used to pass data back to the parent.

   ```js
   function Parent() {
       const childRef = React.useRef(null);

       React.useEffect(() => {
           if (childRef.current) {
               console.log(childRef.current.someData);
           }
       }, []);

       return <Child ref={childRef} />;
   }

   const Child = React.forwardRef((props, ref) => {
       ref.current = { someData: "child data" };

       return <div>Child Component</div>;
   });
   ```

4. **Give 2 ways to prevent components from re-rendering.**

   1. `React.memo` is a HOC (Higher Order Component) that wraps a functional component and prevents it from re-rendering if the props haven't changed. It's a way to optimize components that receive constant or rarely changing props.

   ```js
   const MyComponent = React.memo(function MyComponent(props) {
       return <div>{props.data}</div>;
   });
   ```

   2. Hooks `useMemo` and `useCallback`

   - `useMemo`: This hook allows you to memoize costly values. It's useful when you have computationally intensive operations and want to avoid them running on every render.
   
   - `useCallback`: Memorizes a callback function so it's not recreated on every render. It's especially useful when passing callbacks to optimized components (like those wrapped in React.memo) to prevent unnecessary re-renders.

5. **What is a fragment and why do we need it? Give an example where it might break my app.**

   Fragments in React allow you to group a list of children without adding extra nodes to the DOM. They're especially useful when a component needs to return multiple elements at once, but you don't want to wrap them in an unnecessary container.

   It can break my app in cases like:

   1. Incorrect use of the key in lists: If you're mapping a collection and returning a fragment, you should apply the key to the Fragment and not to the individual elements inside the fragment.
   Incorrect: 
   ```js
   items.map(item => (
       <React.Fragment>
           <li key={item.id}>{item.name}</li>
       </React.Fragment>
   ));
   ```

   Correct: 
   ```js
   items.map(item => (
       <React.Fragment key={item.id}>
           <li>{item.name}</li>
       </React.Fragment>
   ));
   ```

   2. Styles and classes: Fragments don't support attributes like className or style. If you try to pass them, you'll get an error.

   3. Example where it might break my app: If you're expecting a specific number of children (e.g., when using React.Children.only()) and use a fragment, this could cause an error since the fragment can contain multiple children.

6. **Give 3 examples of the HOC pattern.**
   
   1. `withRouter` from `react-router`: injects the router props into a component.
   2. `connect` from `react-redux`: connects a component to the Redux store.
   3. A HOC that handles error capturing using `componentDidCatch`.

7. **What's the difference in handling exceptions in promises, callbacks, and async...await?**

   - Promises: Use `.catch()` or the second argument of `.then()` to handle errors.
   - Callbacks: Conventionally, the first argument of a callback is an error (`err`), which is checked before proceeding.
   - async/await: Uses traditional try/catch blocks to handle errors.

8. **How many arguments does setState take and why is it async?**
   
   `setState` takes up to two arguments. The first is an object with state changes or a function that returns such an object. The second is a callback that executes after the state has been updated.

   It's asynchronous because React batches multiple `setState` calls into a single update to optimize performance and prevent unnecessary re-renders.

9. **List the steps needed to migrate a Class to Function Component.**
   
   - Replace `this.state` with the `useState` hook.
   - Replace lifecycle methods with the `useEffect` hook.
   - Convert component functions into regular functions or arrow functions.
   - Remove `this.props` and use props directly.
   - Remove the `render` method and return JSX directly from the functional component.

10. **List a few ways

 styles can be used with components.**

   - Inline styles.
   - CSS in external files.
   - CSS Modules.
   - JS styling libraries like `styled-components` or `emotion`.

11. **How to render an HTML string coming from the server.**

   You can use `dangerouslySetInnerHTML` in React, but it's important to ensure the content is safe and doesn't pose XSS risks.