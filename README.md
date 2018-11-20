## Examples

### Line chart

![line](https://chartimg.herokuapp.com/chart/line.svg?datasets[0]=1|2|3&datasets[1]=2|1|5&yaxis=Jan|Feb|Mar&legends=apple|banana)
https://chartimg.herokuapp.com/chart/line.svg?datasets[0]=1|2|3&datasets[1]=2|1|5&yaxis=Jan|Feb|Mar&legends=apple|banana

### Bar chart

![bar](https://chartimg.herokuapp.com/chart/bar.svg?datasets[0]=1|2|3&datasets[1]=2|1|5&yaxis=Jan|Feb|Mar&legends=apple|banana)
https://chartimg.herokuapp.com/chart/bar.svg?datasets[0]=1|2|3&datasets[1]=2|1|5&yaxis=Jan|Feb|Mar&legends=apple|banana

## URL Parameters

| name     | type            | example                                           | remark                                |
| -------- | --------------- | ------------------------------------------------- | ------------------------------------- |
| datasets | Array<{string}> | datases[0]=5\|3\|1\|2\|3&datases[1]=4\|2\|3\|1\|5 | Datasets. pipe separated array string |
| legends  | string          | legends=Apple\|Grape                              | Legend titles. pipe separated string  |
| yaxis    | string          | yaxis=Jan\|Feb\|Mar\|Apl\|May\|                   | Y-Axis labels. pipe separated string  |
| width    | number          | width=200                                         | Graph width                           |
| height   | number          | height=100                                        | Graph height                          |
