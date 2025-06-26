# Cranfield Data Collection Project

📊 **Welcome to the Cranfield Data Collection Project!** 📊

<!---->
  <p align="center">
    <img src="https://res.cloudinary.com/dl4vtrbqr/image/upload/v1750963564/bandicam_2025-06-26_21-44-43-609_g00gw4.jpg?raw=true" alt="Banner" width="100%" />
  </p>


## 🌟 Project Overview

This project aims to collect and analyze data from the Cranfield collection, a widely-used dataset in information retrieval research. The data consists of queries and their relevance judgments, which are crucial for evaluating the performance of information retrieval systems.

## 🔍 Features

- **Comprehensive Data Collection**: The dataset includes a wide range of queries and their corresponding relevance judgments.
- **High-Quality Judgments**: Each query is accompanied by relevance judgments that indicate the relevance of documents to the query.
- **Versatile Application**: The data can be used for various research purposes, including evaluating retrieval algorithms, developing new retrieval models, and understanding user behavior in information retrieval systems.

## 🚀 Usage

### Installation

To get started with this project, follow these steps:

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/your-username/cranfield-data-collection.git
    cd cranfield-data-collection
    ```

2. **Install Dependencies**:
    ```sh
    pip install -r requirements.txt
    ```

### Running the Project

1. **Load the Data**:
    ```python
    import pandas as pd

    # Load the data
    data = pd.read_csv('datacollection/cran/cranqrel.trec.txt', delimiter=' ', header=None)
    ```

2. **Analyze the Data**:
    ```python
    # Display the first few rows of the data
    print(data.head())

    # Perform your analysis here
    ```

## 🛠️ Technologies Used

- **Python**: The primary programming language used for data analysis and manipulation.
- **Pandas**: A powerful data manipulation library in Python.
- **Git**: Version control system for managing the project repository.

## 💡 Unique Aspects

- **Detailed Relevance Judgments**: The dataset provides detailed relevance judgments for each query, making it a valuable resource for in-depth analysis.
- **Wide Range of Queries**: The collection includes a diverse set of queries, covering various topics and domains.

## 📈 Possible Improvements

- **Data Visualization**: Implement visualizations to better understand the distribution of relevance judgments and query types.
- **Advanced Analysis**: Develop more sophisticated analysis techniques to extract deeper insights from the data.
- **User Interface**: Create a user-friendly interface for exploring the data and visualizations.

## 📊 Contributors

### Omar Hany Darwish

- **GitHub**: [OmarHanyDarwish](https://github.com/OmarDarwish483)
- **LinkedIn**: [Omar Hany Darwish](https://www.linkedin.com/in/omardrwish/)
- **Email**: darwishomar158@gmail.com

### Omar Hazm

- **GitHub**: [OmarHazm](https://github.com/OxHazem)
## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Acknowledgments

A huge thank you to all the contributors and the open-source community for their support and contributions.

---

🌟 **Thank you for visiting the Cranfield Data Collection Project!** 🌟

If you have any questions or suggestions, feel free to reach out to us. Happy coding! 🚀
