/* 
	- state of the app is in the below format
	- const state = {
			active: "active index"
			elements: {
				"1" : [linkElement, docElement]
				"2" : [linkElement, docElement]
				"3" : [linkElement, docElement]
			}
		}
*/

const state = {
  active: "1",
  elements: getElements(),
};

// addClickListeners on the links to update the state(active index) which in turn updates the DOM
addClickListeners();

function getElements() {
  /* 
		return all the link elements and doc elements in the below format
		elements = {
			"1" : [linkElement, docElement]
			"2" : [linkElement, docElement]
			"3" : [linkElement, docElement]
		}; 
	*/
  const elements = {};
  const links = Array.from(document.querySelectorAll("li.link"));
  const docs = Array.from(document.querySelectorAll("article.doc"));
  links.forEach((link) => {
    const index = link.dataset.index;
    const doc = docs.filter((doc) => doc.dataset.index === index)[0];
    elements[link.dataset.index] = [link, doc];
  });
  return elements;
}

function addClickListeners() {
  /* 
		- adds click event listeners to all links
		- update state when click event happens
	*/
  const links = document.querySelectorAll("li.link");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      setState(link.dataset.index);
    });
  });
}

const setState = (index) => {
  /* 
		- update active property of state
		- calls updateDOM function which updates the dom
	*/
  const prev = state.active;
  state.active = index;
  updateDOM(prev, state);
};

const updateDOM = (prev, state) => {
  /* 
		- toggle active class of prev index link and doc
			- removes active class
		- toggle active class of active index link and doc
			- adds active class
	*/
  const { active, elements } = state;
  elements[prev].forEach(toggleActiveClass);
  elements[active].forEach(toggleActiveClass);
};

const toggleActiveClass = (element) => {
  /* 
		- toggles active class of the element
	*/
  element.classList.toggle("active");
};
