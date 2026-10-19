const messages = {
  flowers: {
    title: 'Flowers for you',
    message:
      'Each time na nakakakita ako ng lilies mahal, ikaw agad naaalala ko. It reminded me of you bc love mo yung colors, and somehow, they express the parts of you that words can’t.',
  },
  music: {
    title: 'Your music corner',
    message:
      'I love that you have your own little world in music. I hope to receive more song cover from Eli! I fr love songs bec of you.',
  },
  cat: {
    title: 'A sleepy little friend',
    message:
      'Imagine a tiny grey cat curled up beside you while you rest. You deserve soft days, peaceful nights, and all the comfort this little world can give, Mahal.',
  },
  mirror: {
    title: 'Look at yourself, love',
    message:
      "I hope you see even a little of what I see in you. You don't need to be perfect to be beautiful, and you never have to earn my love, cause I'm always willing to show it.",
  },
};

const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link[data-page]');
const navigation = document.getElementById('navigation');
const menuToggle = document.getElementById('menuToggle');

function showPage(pageId) {
  const target = document.getElementById(pageId);

  if (!target || !target.classList.contains('page')) return;

  pages.forEach((page) => {
    page.classList.toggle('active', page.id === pageId);
  });

  navLinks.forEach((link) => {
    const selected = link.dataset.page === pageId;
    link.classList.toggle('active', selected);

    if (selected) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  navigation?.classList.remove('menu-open');

  if (menuToggle) {
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    showPage(link.dataset.page);
  });
});

document.querySelectorAll('[data-open-page]').forEach((button) => {
  button.addEventListener('click', () => {
    const pageId = button.dataset.openPage;

    if (pageId === 'room') {
      showPage('bedroom');

      setTimeout(() => {
        document.getElementById('room')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);

      return;
    }

    showPage(pageId);
  });
});

menuToggle?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

const noteModal = document.getElementById('noteModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const closeModal = document.getElementById('closeModal');
const modalDone = document.getElementById('modalDone');

document.querySelectorAll('.room-card').forEach((card) => {
  card.addEventListener('click', () => {
    const note = messages[card.dataset.message];

    if (!note || !noteModal) return;

    modalTitle.textContent = note.title;
    modalMessage.textContent = note.message;
    noteModal.classList.add('open');
    noteModal.setAttribute('aria-hidden', 'false');
  });
});

function hideModal() {
  if (!noteModal) return;

  noteModal.classList.remove('open');
  noteModal.setAttribute('aria-hidden', 'true');
}

closeModal?.addEventListener('click', hideModal);
modalDone?.addEventListener('click', hideModal);

noteModal?.addEventListener('click', (event) => {
  if (event.target === noteModal) {
    hideModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    hideModal();
  }
});

const nailongUrl = document.getElementById('nailongUrl');
const nailongImage = document.getElementById('nailongImage');
const nailongPlaceholder = document.getElementById('nailongPlaceholder');
const loadNailong = document.getElementById('loadNailong');
const nailongMessage = document.getElementById('nailongMessage');
const nailongHello = document.getElementById('nailongHello');

loadNailong?.addEventListener('click', () => {
  const url = nailongUrl.value.trim();

  if (!url) {
    nailongMessage.textContent = 'Paste your Nailong image link first.';
    return;
  }

  try {
    const parsedUrl = new URL(url);

    if (!['https:', 'http:'].includes(parsedUrl.protocol)) {
      throw new Error('Invalid image URL');
    }

    nailongMessage.textContent = 'Loading your Nailong...';

    nailongImage.onload = () => {
      nailongImage.hidden = false;
      nailongPlaceholder.hidden = true;
      nailongMessage.textContent = 'Your little friend is here.';
    };

    nailongImage.onerror = () => {
      nailongImage.hidden = true;
      nailongPlaceholder.hidden = false;
      nailongMessage.textContent =
        'That image link did not work. Try a direct image link.';
    };

    nailongImage.src = parsedUrl.href;
  } catch {
    nailongMessage.textContent = 'Please enter a valid image link.';
  }
});

nailongHello?.addEventListener('click', () => {
  nailongMessage.textContent =
    "Hello, Eli. I'm here to remind you that someone loves you very, very much.";

  nailongHello.textContent = 'Hello received';
});

const youtubeLink = 'https://youtu.be/51Jn7_lW58o?si=kphrOZ4Yzf4RTaXg';
const copySongLink = document.getElementById('copySongLink');
const songResponse = document.getElementById('songResponse');

copySongLink?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(youtubeLink);
    songResponse.textContent = 'Link copied. Open YouTube and enjoy our song.';
  } catch {
    songResponse.textContent =
      'Copy this link and open it in YouTube: ' + youtubeLink;
  }
});

const hugButton = document.getElementById('hugButton');
const kissButton = document.getElementById('kissButton');
const hugAnimation = document.getElementById('hugAnimation');
const hugResponse = document.getElementById('hugResponse');

hugButton?.addEventListener('click', () => {
  hugResponse.textContent = 'HUGS FOR MY ELI! here ikaw kay bochog, mahal ko';

  hugAnimation?.classList.remove('hug-active');
  void hugAnimation?.offsetWidth;
  hugAnimation?.classList.add('hug-active');

  hugButton.textContent = 'One more hug';
});

kissButton?.addEventListener('click', () => {
  hugResponse.textContent = 'MWAAAAAAA:^';

  const kiss = document.createElement('span');
  kiss.className = 'kiss-mark';
  kiss.textContent = ':^';
  kiss.setAttribute('aria-hidden', 'true');
  document.body.appendChild(kiss);

  kiss.addEventListener('animationend', () => {
    kiss.remove();
  });

  kissButton.textContent = 'Send another kiss';
});
