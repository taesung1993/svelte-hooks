<script lang=ts>
  import Toast from './Toast.svelte';
  import {toasts} from '$lib/store/toast';
  import {slide} from 'svelte/transition';

  function portal(node: HTMLElement) {
    const container = document.createElement('section');
    container.classList.add('navigators-container');
    container.appendChild(node);
    
    document.body.appendChild(container);

    return {
      destroy() {
        document.body.removeChild(container);
      }
    }
  }
</script>


<section use:portal class="navigators center">
  {#each $toasts as {id, message, type} (id)}
    <section transition:slide|local={{duration: 200}}>
      <Toast id={id} type={type} message={message}/>
    </section>
  {/each}
</section>

<style lang=scss>
  .navigators {
    position: fixed;
    z-index: 1000;
    display: flex;
    flex-direction: column;

    &.center {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>