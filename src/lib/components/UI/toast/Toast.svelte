<script lang=ts>
  import Fa from 'svelte-fa';
  import {faCircleCheck, faCircleExclamation, faTriangleExclamation, faXmarkCircle, faXmark} from '@fortawesome/free-solid-svg-icons';

   export let type: string = 'success';
   export let message: string = 'test message';
</script>

<section class='toast {type}'> 
  <div class='icon-wrapper {type}'>
    {#if type === 'success'}
      <Fa icon={faCircleCheck} 
          scale={1.8} 
          color='#ffffff'
      />
    {/if}
    {#if type === 'info'}
        <Fa icon={faCircleExclamation} 
            scale={1.8} 
            color='#ffffff'
        />
    {/if}
    {#if type === 'warning'}
        <Fa icon={faTriangleExclamation} 
            scale={1.8} 
            color='#ffffff'
        />
    {/if}
    {#if type === 'error'}
        <Fa icon={faXmarkCircle} 
            scale={1.8} 
            color='#ffffff'
        />
    {/if}
  </div>

  <div class='message'>
    {message}
  </div>

  <div class='close-wrapper'>
    <button>
      <Fa icon={faXmark} 
        scale={1} 
        color='#1c1c1c'
      />
    </button>
  </div>
</section>



<style lang=scss>
 .toast {
    min-width: 32rem;
    height: 5.2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 0.1rem solid transparent;
    border-radius: 1rem;
    padding: 2.8rem 2rem;

    &.success {
      border-color: #3FBE61;
      background-color: #E9F6ED;
    }

    &.info {
      border-color: #156CE1;
      background-color: #E3ECF8;
    }

    &.warning {
      border-color: #EA9301;
      background-color: #F9F4E6;
    }

    &.error {
      border-color: #D8492A;
      background-color: #fff5f4;

    }

    .message {
      flex: 1;
      font-weight: 400;
      font-size: 1.5rem;
      line-height: 2.172rem;
      letter-spacing: -0.01em;
    }

    .icon-wrapper {
      min-width: 3.2rem;
      height: 3.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 1rem;
      margin-right: 1.6rem;

      &.success {
        background-color: #3FBE61;
      }

      &.info {
        background-color: #156CE1;
      }
      
      &.warning {
        background-color: #EA9301;
      }

      &.error {
        background-color: #D8492A;
      }
    }

    .close-wrapper {
      button {
        padding: 0;
        margin: 0;
        width: 1.6rem;
        height: 1.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background: none;
        cursor: pointer;
      }
    }
 }
</style>