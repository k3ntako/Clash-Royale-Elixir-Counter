export default `
<style>
  h1 {
    margin-bottom: 0;
  }

  .suggestions, .playedCards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-row-gap: 24px;
  }
  .playedCards {
    margin-top: 18px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  .cr-card {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  input {
    width: 100%;
    margin: 18px 0;
    padding: 6px;
    height: 24px;
    font-size: 18px;
  }

  .elixirCounter{
    display: flex;
    justify-content: space-between;
  }

  .elixirCounter h3{
    margin: 0 20px;
    font-size: 40px;
  }

  .elixirCounter .buttonsWrapper {
    display: flex;
  }

  .elixirCounter .buttons{
    margin-top: auto;
  }

  .elixirCounter button {
    width: 36px;
    font-size: 16px;
    padding: 4px;
    margin: 0 4px;
    border: 1px solid black;
    background-color: white;
  }
</style>
`