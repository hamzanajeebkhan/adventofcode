import * as fs from 'fs';
import * as path from 'path';

// Function to calculate the total distance between two lists
function calculateTotalDistance(inputFilePath: string): number {
    // Read the input file
    const input = fs.readFileSync(inputFilePath, 'utf-8');

    // Parse the input into two lists
    const leftList: number[] = [];
    const rightList: number[] = [];

    input.split('\n').forEach(line => {
        if (line.trim()) {
            const [left, right] = line.split(/\s+/).map(Number);
            leftList.push(left);
            rightList.push(right);
        }
    });

    // Sort both lists in ascending order
    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);

    // Calculate the total distance
    let totalDistance = 0;
    for (let i = 0; i < leftList.length; i++) {
        totalDistance += Math.abs(leftList[i] - rightList[i]);
    }

    return totalDistance;
}

// Function to calculate the similarity score between two lists
function calculateSimilarityScore(inputFilePath: string): number {
    // Read the input file
    const input = fs.readFileSync(inputFilePath, 'utf-8');

    // Parse the input into two lists
    const leftList: number[] = [];
    const rightList: number[] = [];

    input.split('\n').forEach(line => {
        if (line.trim()) {
            const [left, right] = line.split(/\s+/).map(Number);
            leftList.push(left);
            rightList.push(right);
        }
    });

    // Create a frequency map for the right list
    const rightFrequency: Record<number, number> = {};
    rightList.forEach(num => {
        rightFrequency[num] = (rightFrequency[num] || 0) + 1;
    });

    // Calculate the similarity score
    let similarityScore = 0;
    leftList.forEach(num => {
        if (rightFrequency[num]) {
            similarityScore += num * rightFrequency[num];
        }
    });

    return similarityScore;
}

// Main function to execute the program
function main() {
    const inputFilePath = path.join(__dirname, '../input.txt');

    if (!fs.existsSync(inputFilePath)) {
        console.error(`Input file not found at ${inputFilePath}`);
        process.exit(1);
    }

    const totalDistance = calculateTotalDistance(inputFilePath);
    console.log(`The total distance between the lists is: ${totalDistance}`);

    const similarityScore = calculateSimilarityScore(inputFilePath);
    console.log(`The similarity score between the lists is: ${similarityScore}`);
}

main();
