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

  .elixir-setter-buttons button.filled {
    color: white;
    background-image: linear-gradient(0, rgb(172,53,189), rgb(224,143,236));
  }

  .elixir-setter-buttons button.partially-filled {
    position: relative;
    background-color: rgba(255, 255, 255, 0); /* transparent background */
  }

  .fill {
    position: absolute;
    background-image: linear-gradient(0, rgb(172,53,189), rgb(224,143,236));
    top: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    width: 0.67%;
  }

  .elixirCounter .speed-buttons {
    margin-left: 36px;
  }

  .elixirCounter .speed-buttons .active {
    background-color: #000;
    color: #fff;
  }

  .notification{
    position: absolute;
    flex-direction: column;
    display: flex;
    top: 0;
    left: 0;
    height: 40px;
    width: 100%;
    text-align: center;
    padding: 8px;
    background: #da2d2d;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    color: white;
    justify-content: center;
  }

  /* shake for elixir count on error */
  @keyframes shake {
    0% { transform: skewX(0deg); }
    33% { transform: skewX(15deg); }
    66% { transform: skewX(0deg); }
    100% { transform: skewX(-15deg); }
  }
</style>
`;
