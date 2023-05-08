// this file will make the html page functional
window.addEventListener('load', () => { // add an event to watch (listen) until page is loaded, then proceed to:
    // create our 3 elements
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks")
    // if any created variables/elements end with _el, that is to show they are elements

    form.addEventListener('submit', (e) => { // add an event listener for when we submit a form, and then
        e.preventDefault(); // stop it from refreshing page
        // you can add a console.log("Submit form worked"); to check if its working upon submit (hit F12 in web browser to see console msgs)
        const task = input.value;

        if(!task) { // lets add code to check if we submitted an empty task
            alert("Please fill out the task");
            return; // we dont want anything else to happen if they submit an empty task, so return out of function
        } // end of if
        
        // if something is actually filled out, then proceed with, task section then we can submit it to the tasks section via:

        // create <div> Element and call it task element, then set its class to "task"
        const task_el = document.createElement("div"); // get the actual task element and set it to a "div" element
        task_el.classList.add("task"); // add the task class 
        
        // create another <div> Element and call it task content element, then set its class to "content"
        const task_content_el = document.createElement("div"); // get the task_content element and set it to a "div" element
        task_content_el.classList.add("content"); // this is start of content element: add the content class
        
        // append content element we created into the task element we created (so content comes after task in heirarchy)
        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement("input"); // create a new element of type <"input"> this time instead of type <div>
        task_input_el.type = "text"; // set its type = "text"
        task_input_el.classList.add("text"); // set its class = "text"
        task_input_el.value = task; // set its class = task
        task_input_el.setAttribute("readonly", "readonly"); // make the task attribute to readonly, so we we cant edit it after its submitted

        task_content_el.appendChild(task_input_el); // ending of content element
        // we want to setup our action, aka buttons
        const task_actions_el = document.createElement("div") // create another <div> Element and call it task action element, for the buttons
        task_actions_el.classList.add("actions"); // then set its class to "action", since this is what they're supposed to be: buttons do an action
        
        // now setup our Edit and Delete buttons: by creating an element for it with correct class attached
        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit";
        
        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";

        // append the child Task Buttons (that we created above) to the Actions element:
        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        // append the Actions element to the Task element:
        task_el.appendChild(task_actions_el);
        // Then lastly append the Task element to the List element: This is what applies the button html elements back into the webpage
        list_el.appendChild(task_el); // append task elements to list elements 

        input.value = "";

        // 
        task_edit_el.addEventListener('click', () => { // once task (form) is submitted, we can make it editably by
            if (task_edit_el.innerText.toLowerCase() == "edit") // if button currently says 'Edit' ('edit' with )
            {
                task_input_el.removeAttribute("readonly"); // removing readonly text, it'll now be editable
                task_input_el.focus(); // set cursor to the end of the task
                task_edit_el.innerText = "Save"; // change "Edit" button to "Save"
            } else { // now if the button says something else other than edit, aka save, :
                task_input_el.setAttribute("readonly", "readonly"); //  give the Save button functionality:
                task_edit_el.innerText = "Edit";
            }
        });


        // Code for delete button:
        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el); // delete task
        }); // end of delete

    }); // submit event listener
});