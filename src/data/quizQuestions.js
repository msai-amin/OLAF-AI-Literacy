export const questionPools = {
    ml: [
        {
            question: "What is the main difference between Supervised Learning (SL) and Unsupervised Learning (UL)?",
            options: [
                "SL uses labeled data, UL uses unlabeled data",
                "SL is faster, UL is slower",
                "SL requires more data, UL requires less data",
                "SL is for classification, UL is for regression"
            ],
            correct: 0,
            module: "ML"
        },
        {
            question: "Which ML algorithm combines multiple decision trees to make predictions?",
            options: [
                "Linear Regression",
                "Random Forest",
                "K-Means Clustering",
                "Neural Network"
            ],
            correct: 1,
            module: "ML"
        },
        {
            question: "What does 'overfitting' mean in machine learning?",
            options: [
                "The model performs well on training data but poorly on new data",
                "The model needs more training data",
                "The model is too simple to learn patterns",
                "The model has too many features"
            ],
            correct: 0,
            module: "ML"
        },
        {
            question: "In Reinforcement Learning (RL), how does the model learn?",
            options: [
                "From labeled examples",
                "Through trial and error with rewards and penalties",
                "By finding patterns in unlabeled data",
                "By memorizing training data"
            ],
            correct: 1,
            module: "ML"
        },
        {
            question: "What is the primary purpose of a training set vs. a test set?",
            options: [
                "Training set teaches the model, test set evaluates generalization",
                "Training set is larger, test set is smaller",
                "Training set is for validation, test set is for training",
                "They serve the same purpose"
            ],
            correct: 0,
            module: "ML"
        },
        {
            question: "Which algorithm would you use to predict tree volume from DBH and height?",
            options: [
                "Classification algorithm",
                "Regression algorithm",
                "Clustering algorithm",
                "Decision tree"
            ],
            correct: 1,
            module: "ML"
        },
        {
            question: "What does K-Means Clustering discover?",
            options: [
                "Hidden patterns in labeled data",
                "Natural groupings in data without labels",
                "The best regression line",
                "Decision rules for classification"
            ],
            correct: 1,
            module: "ML"
        }
    ],
    vision: [
        {
            question: "What does 'Confidence Threshold' represent in computer vision?",
            options: [
                "The percentage of correct predictions",
                "The cutoff point you set for accepting AI predictions",
                "The number of training images needed",
                "The processing speed of the AI model"
            ],
            correct: 1,
            module: "Vision"
        },
        {
            question: "What is a 'False Positive' in computer vision?",
            options: [
                "Missing an actual log",
                "Correctly identifying a log",
                "Incorrectly identifying a rock as a log",
                "The model being too cautious"
            ],
            correct: 2,
            module: "Vision"
        },
        {
            question: "Precision measures what?",
            options: [
                "How many actual logs were found",
                "What percentage of detected objects were actually logs",
                "How fast the model processes images",
                "The total number of objects detected"
            ],
            correct: 1,
            module: "Vision"
        },
        {
            question: "Recall measures what?",
            options: [
                "The accuracy of positive predictions",
                "What percentage of actual logs were successfully identified",
                "The total number of false positives",
                "The processing time per image"
            ],
            correct: 1,
            module: "Vision"
        },
        {
            question: "Why might an AI model struggle with logs on a cloudy day versus a sunny day?",
            options: [
                "The model doesn't work in bad weather",
                "Lighting changes pixel values, affecting model performance",
                "Clouds block the camera view",
                "The model needs retraining for each weather condition"
            ],
            correct: 1,
            module: "Vision"
        },
        {
            question: "In computer vision, what does the AI actually 'see'?",
            options: [
                "Images like humans do",
                "A grid of numbers representing pixel RGB values",
                "Shapes and colors directly",
                "Text descriptions of objects"
            ],
            correct: 1,
            module: "Vision"
        },
        {
            question: "What is the trade-off between precision and recall?",
            options: [
                "Increasing one always increases the other",
                "Increasing threshold usually increases precision but decreases recall",
                "They are independent metrics",
                "Precision is always more important than recall"
            ],
            correct: 1,
            module: "Vision"
        }
    ],
    prediction: [
        {
            question: "What is Predictive Analytics?",
            options: [
                "Analyzing past data only",
                "Using historical data to predict future events",
                "Creating visualizations of current data",
                "Classifying data into categories"
            ],
            correct: 1,
            module: "Prediction"
        },
        {
            question: "What is Cellular Automata used for in fire prediction?",
            options: [
                "To create fire spread simulations using simple rules",
                "To measure fire temperature",
                "To detect fires from satellite imagery",
                "To calculate fire suppression costs"
            ],
            correct: 0,
            module: "Prediction"
        },
        {
            question: "Which environmental variable typically has the strongest influence on fire spread?",
            options: [
                "Fuel moisture",
                "Wind speed and direction",
                "Air temperature",
                "Humidity"
            ],
            correct: 1,
            module: "Prediction"
        },
        {
            question: "In fire prediction models, what does 'fuel load' refer to?",
            options: [
                "The amount of combustible material in an area",
                "The speed at which fire spreads",
                "The direction of fire movement",
                "The intensity of the fire"
            ],
            correct: 0,
            module: "Prediction"
        },
        {
            question: "Why is terrain important in fire spread prediction?",
            options: [
                "Fire doesn't spread on slopes",
                "Slope and aspect affect fire behavior and spread rate",
                "Terrain has no effect on fire",
                "Only flat terrain matters"
            ],
            correct: 1,
            module: "Prediction"
        },
        {
            question: "What makes predictive models valuable for foresters?",
            options: [
                "They can predict exact fire locations",
                "They identify patterns in historical data that humans can't see",
                "They eliminate the need for field work",
                "They work perfectly in all conditions"
            ],
            correct: 1,
            module: "Prediction"
        }
    ],
    genai: [
        {
            question: "What is a 'hallucination' in Generative AI?",
            options: [
                "The AI making mistakes",
                "The AI inventing information that sounds plausible but isn't in source data",
                "The AI being slow to respond",
                "The AI refusing to generate content"
            ],
            correct: 1,
            module: "GenAI"
        },
        {
            question: "What should you always do with GenAI-generated reports?",
            options: [
                "Use them as-is without checking",
                "Verify all facts against source documents",
                "Assume they are always accurate",
                "Only check the formatting"
            ],
            correct: 1,
            module: "GenAI"
        },
        {
            question: "Why might GenAI add information that wasn't in your source notes?",
            options: [
                "It makes random mistakes",
                "It tries to 'complete' the narrative by predicting what should be there",
                "It doesn't understand the input",
                "It's designed to expand content"
            ],
            correct: 1,
            module: "GenAI"
        },
        {
            question: "What is a key strength of Generative AI in forestry applications?",
            options: [
                "It always provides accurate facts",
                "It can transform informal field notes into professional reports",
                "It eliminates the need for human review",
                "It generates original research data"
            ],
            correct: 1,
            module: "GenAI"
        },
        {
            question: "If GenAI generates a report mentioning an endangered species sighting that wasn't in your notes, what should you do?",
            options: [
                "Trust it and include it in official reports",
                "Treat it as a hallucination and verify before using",
                "Assume it's correct because it sounds plausible",
                "Use it but note it came from AI"
            ],
            correct: 1,
            module: "GenAI"
        },
        {
            question: "What is the primary risk of using GenAI for regulatory compliance information?",
            options: [
                "The AI is too slow",
                "Regulations change frequently and AI training data may be outdated",
                "The AI charges too much",
                "The AI format is not professional"
            ],
            correct: 1,
            module: "GenAI"
        }
    ],
    dataQuality: [
        {
            question: "What does GIGO stand for?",
            options: [
                "Good Input, Good Output",
                "Garbage In, Garbage Out",
                "Great Information, Great Outcomes",
                "General Input, General Output"
            ],
            correct: 1,
            module: "Data Quality"
        },
        {
            question: "What happens if you train an AI model with telephone poles labeled as 'trees'?",
            options: [
                "The model will work perfectly",
                "The model will classify telephone poles as trees in the field",
                "The model will ignore the poles",
                "The model will need more training data"
            ],
            correct: 1,
            module: "Data Quality"
        },
        {
            question: "Why is data quality critical for AI models?",
            options: [
                "Bad data makes training slower",
                "AI models learn patterns from training data, so bad data creates bad models",
                "Bad data is just noisy but doesn't affect results",
                "Data quality only matters for large datasets"
            ],
            correct: 1,
            module: "Data Quality"
        },
        {
            question: "If your training data includes 20% mislabeled samples, what is the likely outcome?",
            options: [
                "The model will automatically correct the errors",
                "The model will learn the incorrect patterns and make similar mistakes",
                "The model will ignore the mislabeled samples",
                "The model will ask for better data"
            ],
            correct: 1,
            module: "Data Quality"
        },
        {
            question: "What is the best practice for training data in forestry AI applications?",
            options: [
                "Include all data, even if unsure about labels",
                "Only include high-quality, correctly labeled samples",
                "Use as much data as possible regardless of quality",
                "Let the AI automatically label everything"
            ],
            correct: 1,
            module: "Data Quality"
        },
        {
            question: "What should you do if you discover errors in your training data after model deployment?",
            options: [
                "Ignore them if the model seems to work",
                "Retrain the model with corrected data immediately",
                "Only fix errors for future training",
                "Assume the model will learn around the errors"
            ],
            correct: 1,
            module: "Data Quality"
        }
    ],
    lidar: [
        {
            question: "What is a LiDAR point cloud?",
            options: [
                "A 3D model of a cloud",
                "Millions of individual points in 3D space with X, Y, Z coordinates",
                "A single image from a drone",
                "A map showing forest boundaries"
            ],
            correct: 1,
            module: "LiDAR"
        },
        {
            question: "What is semantic segmentation in LiDAR processing?",
            options: [
                "Measuring point cloud density",
                "Classifying each point into categories like Ground, Vegetation, Buildings",
                "Converting points to images",
                "Counting the number of points"
            ],
            correct: 1,
            module: "LiDAR"
        },
        {
            question: "Why is accurate ground classification critical for forestry?",
            options: [
                "It's only needed for visualization",
                "It's the foundation for all downstream analysis (height, volume, terrain)",
                "Ground points are easier to process",
                "It doesn't affect other measurements"
            ],
            correct: 1,
            module: "LiDAR"
        },
        {
            question: "What does DTM stand for?",
            options: [
                "Digital Tree Model",
                "Digital Terrain Model",
                "Data Tree Mapping",
                "Detailed Terrain Measurement"
            ],
            correct: 1,
            module: "LiDAR"
        },
        {
            question: "In dense forests, why might some LiDAR pulses never reach the ground?",
            options: [
                "The sensor isn't powerful enough",
                "Pulses hit leaves and branches first, creating data gaps",
                "Ground absorbs all pulses",
                "The technology doesn't work in forests"
            ],
            correct: 1,
            module: "LiDAR"
        },
        {
            question: "How do foresters use LiDAR to measure tree height?",
            options: [
                "By counting points in each tree",
                "By calculating vertical distance from ground points to highest vegetation points",
                "By measuring tree diameter",
                "By analyzing tree color"
            ],
            correct: 1,
            module: "LiDAR"
        },
        {
            question: "What should you do if 15% of points in a LiDAR dataset are classified as 'unclassified'?",
            options: [
                "Ignore them and use the remaining 85%",
                "Investigate these areas as they may indicate data quality issues",
                "Assume they are all ground points",
                "Delete them from the dataset"
            ],
            correct: 1,
            module: "LiDAR"
        }
    ]
};

// Function to randomly select 5 questions from each module pool
export function selectRandomQuestions() {
    const selectedQuestions = [];
    
    Object.keys(questionPools).forEach(moduleKey => {
        const pool = questionPools[moduleKey];
        // Shuffle and take first 5
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        selectedQuestions.push(...shuffled.slice(0, 5));
    });
    
    // Shuffle all selected questions to randomize order
    return selectedQuestions.sort(() => Math.random() - 0.5);
}
