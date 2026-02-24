1.  What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
    Q,answer.No-01

- getElementById : Finds element by id only,always returns 1 element
- getElementsByClassName : Finds element by class name,returns many elements(HTMLCollection)
- querySelector : Selects elements with CSS selector,returns only the first matching element
- querySelectorAll : Gets all matching elements with CSS selector, returns NodeList

2. How do you create and insert a new element into the DOM?
   Q,answer.No-02
   first create element, secend give text content, thred insert into DOM

3. What is Event Bubbling? And how does it work?
   Q,answer.No-03
   Event Bubbling is when the event of the child (button) is triggered first,Then the event goes up to the parent (div),Then it can go up to the document

4. What is Event Delegation in JavaScript? Why is it useful?
   Q,answer.No-04
   Event Delegation is to set an event listener on the parent element and handle the event of the child element. Performance is good,works on dynamic elements,clean code,saves memory.

5. What is the difference between preventDefault() and stopPropagation() methods?
   Q,answer.No-05
   preventDefault() is a method that stops the browser's default behavior and stopPropagation() is a method that stops event bubbling.
