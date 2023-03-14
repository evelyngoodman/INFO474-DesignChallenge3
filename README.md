# 474 Final Deliverable

> Reminder: Start an http server for this lab's directory. From command line call `python -m SimpleHTTPServer 8080` (for Python 2) or `python -m http.server 8080` (for Python 3).

## Design Overview
I chose to focus on a specific user group for my final design. I wanted to focus on creating  a tool for K-12 students studying weather or atmosphere science in science classes. A note here: for this assignment I focused on the Seattle dataset but this project could be expanded to include a selection of which state to focus on as well. With this user group in mind, I knew my design needed to be simple, intuitive, and use engaging design principles to provide some level of dimensionality to the visualization. My design has three main components: 

1. drop down menu where the user can select which variable to look at 
2. line chart showing the trend of the selected variable over time
3. vertical gradient on the line to add more context for whether or not a value is high or low

All three of these components work together to achieve my goals of intuitiveness, simplicity, and engagement. For example, the color gradient adds another visual aid in understanding the scale of temperature. I chose blue to show lower temperatures and red to show higher temperature. This choice was made based on our conversations in class about using color schemes that are intuitive and have a strong associative property with what they are trying to display (red = hot). I also only focused on variables that had to do with temperature to stay consistent with the gradient associative properties. 

## User Tasks 
1. **Discover trends** — As a middle school student, I want to discover trends in temperature for my city in order to complete an assignment on the weather cycle.
2. **Compare trends** — As a student in high school, I want to look at the trend over time of certain variables to study how weather patterns change over time.
3. **Identify features** — As a student, I would like the visualizations I interact with to be engaging and easy to synthesize in a small amount of time in order to maximize my understanding.
