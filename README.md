# Web Development Project 4 - StumbleUpon Cat Discovery

Submitted by: **Ansh Tomar**

This web app: Lets users discover random cats, view their breed, origin, and temperament, and ban breeds or origins from future results. Users can also see a history of previously discovered cats. Modern, responsive UI.

Time spent: **2** hours spent in total

## Required Features

The following **required** functionality is completed: 

- [x] **Application features a button that creates a new API fetch request on click and displays at least three attributes and an image obtained from the returned JSON data**
  - The type of attribute displayed for each image is consistent across API calls
- [x] **Only one item/data from API call response is viewable at a time and at least one image is displayed per API call**
  - A single result of an API call is displayed at a time 
  - Displayed attributes match the displayed image
  - There is at least one image per API call
- [x] **API call response results should appear random to the user**
  - Clicking on the API call button generates a seemingly random new result each time
  - Repeats are infrequent
- [x] **Clicking on a displayed value for one attribute adds it to a displayed ban list**
  - At least one attribute for each API result is clickable
  - Clicking on a clickable attribute not on the ban list immediately adds it to the ban list 
  - Clicking on an attribute in the ban list immediately removes it from the ban list 
- [x] **Attributes on the ban list prevent further images/API results with attribute values in the ban list from being displayed**
  - Clicking on the API call button does not result in any image/attributes with attribute values in the ban list being displayed
  - More attribute values on the ban list may result in a higher frequency of repeat results

## Optional Features

The following **optional** features are implemented:

- [x] Multiple types of attributes are clickable and can be added to the ban list
- [x] Users can see a stored history of their previously displayed results from this session
  - A dedicated section of the application displays all the previous images/attributes seen before
  - Each time the API call button is clicked, the history updates with the newest API result


## Notes

No major challenges encountered.

## License

Copyright 2025 Ansh Tomar

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.