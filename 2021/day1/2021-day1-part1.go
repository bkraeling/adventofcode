package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	input := []int{}

	file, err := os.Open("2021-day1-test.txt")
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

	for i := 0; i < len(input) - 1; i++{
		var current_element = input[i]
		var next_element = input[i+1]

		if current_element < next_element {
			increases = increases + 1
		}
	}
	fmt.Println("Number of increases: ", increases)  

	if err := scanner.Err(); err != nil {
			fmt.Println(err)
	}
}
