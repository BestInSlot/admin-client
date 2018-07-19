<template>
    <div class="input-control">
        <input type="text" class="search-input" required>
        <label for="" class="input-label">Search</label>
    </div>
</template>

<style lang="scss">
.input-control {
  position: relative;
  flex: 1;
  display: flex;
  .input-label {
    position: absolute;
    top: 10px;
    left: 5px;
    font-weight: normal;
    pointer-events: none;
    transition: all 0.2s ease;
    color: #555;
  }
  .search-input {
    background: none !important;
    padding: 1rem 0.5rem 0.5rem;
    border-width: 0 0 2px 0;
    border-color: #fff;
    display: block;
    flex: 1;
    color: #cacaca;
    &:focus {
      outline: none;
      border-color: rgba(52, 152, 219, 1);
    }
  }
  input:focus ~ label, input:valid ~ label {
      top: 0;
      font-size: 8pt;
      color: #f1f1f1;
  }
}
</style>
