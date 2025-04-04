# Elevator Project
This project implements a very simple version of an elevator, which takes as input the starting floor and the floors to visit and returns the floors visited (in order) and the total travel time. I took the liberty of implmenting a simple UI using HTML Select elements to make it easier to test different varieties of input and output. I created a wrapper HOC for Select to remember the order destination floors are selected in and return them in that order.

# Assumptions
Based on the provided sample input / output, my assumption is that we want the elevator to visit the floors in the order provided, rather than optimizing travel time by stopping at intervening floors as a real elevator might. In a Production environment, this would likely be more complex, with the first floor to visit determining the direction of travel and the elevator then checking if it needs to stop at each floor between it's starting position and the destination (since additional input could theoretically come at any time).

# Limitations
The use of HTML multiple Select is not ideal, as you cannot see the order you selected the floors in. In a full implementation, I would likely use something like Material UI, which has the option to display a multi-select as a list of "chips" which can be individually removed. Using a Select element also prohibits you from selecting the same floor multiple times; however, since this mirrors the way an actual elevator typically works, I assume this is acceptable.
