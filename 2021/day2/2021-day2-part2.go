package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input := []string{}

	file, err := os.Open("2021-day2-input.txt")
	if err != nil {
			fmt.Println(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		var text_element = scanner.Text()
		input = append(input, text_element)
	}

	var xPos = 0
	var zPos = 0
	var aim = 0

	for _, instruction := range input {
		parts := strings.Split(instruction, " ")
		direction := parts[0]
		amount, _ := strconv.Atoi(parts[1])
		switch direction {
		case "forward":
			xPos = xPos + amount
			zPos = zPos + (amount * aim)
		case "down":
			aim = aim + amount
		case "up":
			aim = aim - amount
		}
		fmt.Println("Horizontal position: ", xPos)
		fmt.Println("Depth: ", zPos)
	}

	fmt.Println("Product is: ", xPos * zPos)

	if err := scanner.Err(); err != nil {
			fmt.Println(err)
	}
}
