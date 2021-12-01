package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	input := []int{}

	file, err := os.Open("2021-day1-input.txt")
	if err != nil {
			fmt.Println(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		var text_element = scanner.Text()
		int_element, _ := strconv.Atoi(text_element)
		input = append(input, int_element)
	}

	var increases = 0;
	var lastSum = 0;

	for i := 2; i < len(input); i++{
		var first_element = input[i-2]
		var second_element = input[i-1]
		var third_element = input[i]
		fmt.Println("First: ", first_element, " Second: ", second_element, " Third: ", third_element)
		var sum = first_element + second_element + third_element
		fmt.Println("i: ", i, " Last sum: ", lastSum, " Sum: ", sum)
		if i != 2 && sum > lastSum {
			fmt.Println("Next element is larger than current, add an increase")
			increases = increases + 1
		}
		lastSum = sum
	}
	fmt.Println("Number of increases: ", increases)  

	if err := scanner.Err(); err != nil {
			fmt.Println(err)
	}
}
